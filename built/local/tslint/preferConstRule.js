"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferConstWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING_FACTORY = function (identifier) { return ("Identifier '" + identifier + "' never appears on the LHS of an assignment - use const instead of let for its declaration."); };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function isBindingPattern(node) {
    return !!node && (node.kind === ts.SyntaxKind.ArrayBindingPattern || node.kind === ts.SyntaxKind.ObjectBindingPattern);
}
function walkUpBindingElementsAndPatterns(node) {
    while (node && (node.kind === ts.SyntaxKind.BindingElement || isBindingPattern(node))) {
        node = node.parent;
    }
    return node;
}
function getCombinedNodeFlags(node) {
    node = walkUpBindingElementsAndPatterns(node);
    var flags = node.flags;
    if (node.kind === ts.SyntaxKind.VariableDeclaration) {
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableDeclarationList) {
        flags |= node.flags;
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableStatement) {
        flags |= node.flags;
    }
    return flags;
}
function isLet(node) {
    return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Let);
}
function isExported(node) {
    return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Export);
}
function isAssignmentOperator(token) {
    return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
}
function isBindingLiteralExpression(node) {
    return (!!node) && (node.kind === ts.SyntaxKind.ObjectLiteralExpression || node.kind === ts.SyntaxKind.ArrayLiteralExpression);
}
var PreferConstWalker = (function (_super) {
    __extends(PreferConstWalker, _super);
    function PreferConstWalker() {
        _super.apply(this, arguments);
        this.inScopeLetDeclarations = [];
        this.errors = [];
    }
    PreferConstWalker.prototype.markAssignment = function (identifier) {
        var name = identifier.text;
        for (var i = this.inScopeLetDeclarations.length - 1; i >= 0; i--) {
            var declarations = this.inScopeLetDeclarations[i];
            if (declarations[name]) {
                declarations[name].usages++;
                break;
            }
        }
    };
    PreferConstWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        _super.prototype.visitSourceFile.call(this, node);
        // Sort errors by position because tslint doesn't
        this.errors.sort(function (a, b) { return a.getStartPosition().getPosition() - b.getStartPosition().getPosition(); }).forEach(function (e) { return _this.addFailure(e); });
    };
    PreferConstWalker.prototype.visitBinaryExpression = function (node) {
        if (isAssignmentOperator(node.operatorToken.kind)) {
            this.visitLeftHandSideExpression(node.left);
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitLeftHandSideExpression = function (node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
            node = node.expression;
        }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.markAssignment(node);
        }
        else if (isBindingLiteralExpression(node)) {
            this.visitBindingLiteralExpression(node);
        }
    };
    PreferConstWalker.prototype.visitBindingLiteralExpression = function (node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var pattern = node;
            for (var _i = 0, _a = pattern.properties; _i < _a.length; _i++) {
                var element = _a[_i];
                var kind = element.kind;
                if (kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    this.markAssignment(element.name);
                }
                else if (kind === ts.SyntaxKind.PropertyAssignment) {
                    this.visitLeftHandSideExpression(element.initializer);
                }
            }
        }
        else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            var pattern = node;
            for (var _b = 0, _c = pattern.elements; _b < _c.length; _b++) {
                var element = _c[_b];
                this.visitLeftHandSideExpression(element);
            }
        }
    };
    PreferConstWalker.prototype.visitBindingPatternIdentifiers = function (pattern) {
        for (var _i = 0, _a = pattern.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.name.kind === ts.SyntaxKind.Identifier) {
                this.markAssignment(element.name);
            }
            else {
                this.visitBindingPatternIdentifiers(element.name);
            }
        }
    };
    PreferConstWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitAnyUnaryExpression = function (node) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            this.visitLeftHandSideExpression(node.operand);
        }
    };
    PreferConstWalker.prototype.visitModuleDeclaration = function (node) {
        if (node.body.kind === ts.SyntaxKind.ModuleBlock) {
            // For some reason module blocks are left out of the visit block traversal
            this.visitBlock(node.body);
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    PreferConstWalker.prototype.visitForOfStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForOfStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitForInStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForInStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitAnyForStatement = function (node) {
        var names = {};
        if (isLet(node.initializer)) {
            if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                this.collectLetIdentifiers(node.initializer, names);
            }
        }
        this.inScopeLetDeclarations.push(names);
    };
    PreferConstWalker.prototype.popDeclarations = function () {
        var completed = this.inScopeLetDeclarations.pop();
        for (var name_1 in completed) {
            if (Object.hasOwnProperty.call(completed, name_1)) {
                var element = completed[name_1];
                if (element.usages === 0) {
                    this.errors.push(this.createFailure(element.declaration.getStart(this.getSourceFile()), element.declaration.getWidth(this.getSourceFile()), Rule.FAILURE_STRING_FACTORY(name_1)));
                }
            }
        }
    };
    PreferConstWalker.prototype.visitBlock = function (node) {
        var names = {};
        for (var _i = 0, _a = node.statements; _i < _a.length; _i++) {
            var statement = _a[_i];
            if (statement.kind === ts.SyntaxKind.VariableStatement) {
                this.collectLetIdentifiers(statement.declarationList, names);
            }
        }
        this.inScopeLetDeclarations.push(names);
        _super.prototype.visitBlock.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.collectLetIdentifiers = function (list, ret) {
        for (var _i = 0, _a = list.declarations; _i < _a.length; _i++) {
            var node = _a[_i];
            if (isLet(node) && !isExported(node)) {
                this.collectNameIdentifiers(node, node.name, ret);
            }
        }
    };
    PreferConstWalker.prototype.collectNameIdentifiers = function (declaration, node, table) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            table[node.text] = { declaration: declaration, usages: 0 };
        }
        else {
            this.collectBindingPatternIdentifiers(declaration, node, table);
        }
    };
    PreferConstWalker.prototype.collectBindingPatternIdentifiers = function (value, pattern, table) {
        for (var _i = 0, _a = pattern.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            this.collectNameIdentifiers(value, element.name, table);
        }
    };
    return PreferConstWalker;
}(Lint.RuleWalker));
