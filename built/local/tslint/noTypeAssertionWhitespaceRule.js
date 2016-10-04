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
        return this.applyWithWalker(new TypeAssertionWhitespaceWalker(sourceFile, this.getOptions()));
    };
    Rule.TRAILING_FAILURE_STRING = "Excess trailing whitespace found around type assertion.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypeAssertionWhitespaceWalker = (function (_super) {
    __extends(TypeAssertionWhitespaceWalker, _super);
    function TypeAssertionWhitespaceWalker() {
        _super.apply(this, arguments);
    }
    TypeAssertionWhitespaceWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.TypeAssertionExpression) {
            var refined = node;
            var leftSideWhitespaceStart = refined.type.getEnd() + 1;
            var rightSideWhitespaceEnd = refined.expression.getStart();
            if (leftSideWhitespaceStart !== rightSideWhitespaceEnd) {
                this.addFailure(this.createFailure(leftSideWhitespaceStart, rightSideWhitespaceEnd, Rule.TRAILING_FAILURE_STRING));
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return TypeAssertionWhitespaceWalker;
}(Lint.RuleWalker));
