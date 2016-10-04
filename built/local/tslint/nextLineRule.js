"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var OPTION_CATCH = "check-catch";
var OPTION_ELSE = "check-else";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NextLineWalker(sourceFile, this.getOptions()));
    };
    Rule.CATCH_FAILURE_STRING = "'catch' should not be on the same line as the preceeding block's curly brace";
    Rule.ELSE_FAILURE_STRING = "'else' should not be on the same line as the preceeding block's curly brace";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NextLineWalker = (function (_super) {
    __extends(NextLineWalker, _super);
    function NextLineWalker() {
        _super.apply(this, arguments);
    }
    NextLineWalker.prototype.visitIfStatement = function (node) {
        var sourceFile = node.getSourceFile();
        var thenStatement = node.thenStatement;
        var elseStatement = node.elseStatement;
        if (!!elseStatement) {
            // find the else keyword
            var elseKeyword = getFirstChildOfKind(node, ts.SyntaxKind.ElseKeyword);
            if (this.hasOption(OPTION_ELSE) && !!elseKeyword) {
                var thenStatementEndLoc = sourceFile.getLineAndCharacterOfPosition(thenStatement.getEnd());
                var elseKeywordLoc = sourceFile.getLineAndCharacterOfPosition(elseKeyword.getStart(sourceFile));
                if (thenStatementEndLoc.line === elseKeywordLoc.line) {
                    var failure = this.createFailure(elseKeyword.getStart(sourceFile), elseKeyword.getWidth(sourceFile), Rule.ELSE_FAILURE_STRING);
                    this.addFailure(failure);
                }
            }
        }
        _super.prototype.visitIfStatement.call(this, node);
    };
    NextLineWalker.prototype.visitTryStatement = function (node) {
        var sourceFile = node.getSourceFile();
        var catchClause = node.catchClause;
        // "visit" try block
        var tryBlock = node.tryBlock;
        if (this.hasOption(OPTION_CATCH) && !!catchClause) {
            var tryClosingBrace = tryBlock.getLastToken(sourceFile);
            var catchKeyword = catchClause.getFirstToken(sourceFile);
            var tryClosingBraceLoc = sourceFile.getLineAndCharacterOfPosition(tryClosingBrace.getEnd());
            var catchKeywordLoc = sourceFile.getLineAndCharacterOfPosition(catchKeyword.getStart(sourceFile));
            if (tryClosingBraceLoc.line === catchKeywordLoc.line) {
                var failure = this.createFailure(catchKeyword.getStart(sourceFile), catchKeyword.getWidth(sourceFile), Rule.CATCH_FAILURE_STRING);
                this.addFailure(failure);
            }
        }
        _super.prototype.visitTryStatement.call(this, node);
    };
    return NextLineWalker;
}(Lint.RuleWalker));
function getFirstChildOfKind(node, kind) {
    return node.getChildren().filter(function (child) { return child.kind === kind; })[0];
}
