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
        return this.applyWithWalker(new ObjectLiteralSpaceWalker(sourceFile, this.getOptions()));
    };
    Rule.LEADING_FAILURE_STRING = "No leading whitespace found on single-line object literal.";
    Rule.TRAILING_FAILURE_STRING = "No trailing whitespace found on single-line object literal.";
    Rule.LEADING_EXCESS_FAILURE_STRING = "Excess leading whitespace found on single-line object literal.";
    Rule.TRAILING_EXCESS_FAILURE_STRING = "Excess trailing whitespace found on single-line object literal.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ObjectLiteralSpaceWalker = (function (_super) {
    __extends(ObjectLiteralSpaceWalker, _super);
    function ObjectLiteralSpaceWalker() {
        _super.apply(this, arguments);
    }
    ObjectLiteralSpaceWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var literal = node;
            var text = literal.getText();
            if (text.match(/^{[^\n]+}$/g)) {
                if (text.charAt(1) !== " ") {
                    var failure = this.createFailure(node.pos, node.getWidth(), Rule.LEADING_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(2) === " ") {
                    var failure = this.createFailure(node.pos + 2, 1, Rule.LEADING_EXCESS_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(text.length - 2) !== " ") {
                    var failure = this.createFailure(node.pos, node.getWidth(), Rule.TRAILING_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(text.length - 3) === " ") {
                    var failure = this.createFailure(node.pos + node.getWidth() - 3, 1, Rule.TRAILING_EXCESS_FAILURE_STRING);
                    this.addFailure(failure);
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return ObjectLiteralSpaceWalker;
}(Lint.RuleWalker));
