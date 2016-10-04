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
        return this.applyWithWalker(new InWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "Don't use the 'in' keyword - use 'hasProperty' to check for key presence instead";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var InWalker = (function (_super) {
    __extends(InWalker, _super);
    function InWalker() {
        _super.apply(this, arguments);
    }
    InWalker.prototype.visitNode = function (node) {
        _super.prototype.visitNode.call(this, node);
        if (node.kind === ts.SyntaxKind.InKeyword && node.parent && node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return InWalker;
}(Lint.RuleWalker));
