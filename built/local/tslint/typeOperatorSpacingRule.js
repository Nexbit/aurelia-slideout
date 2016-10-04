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
        return this.applyWithWalker(new TypeOperatorSpacingWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "The '|' and '&' operators must be surrounded by single spaces";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypeOperatorSpacingWalker = (function (_super) {
    __extends(TypeOperatorSpacingWalker, _super);
    function TypeOperatorSpacingWalker() {
        _super.apply(this, arguments);
    }
    TypeOperatorSpacingWalker.prototype.visitNode = function (node) {
        if (node.kind === ts.SyntaxKind.UnionType || node.kind === ts.SyntaxKind.IntersectionType) {
            var types = node.types;
            var expectedStart = types[0].end + 2; // space, | or &
            for (var i = 1; i < types.length; i++) {
                var currentType = types[i];
                if (expectedStart !== currentType.pos || currentType.getLeadingTriviaWidth() !== 1) {
                    var failure = this.createFailure(currentType.pos, currentType.getWidth(), Rule.FAILURE_STRING);
                    this.addFailure(failure);
                }
                expectedStart = currentType.end + 2;
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return TypeOperatorSpacingWalker;
}(Lint.RuleWalker));
