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
        var program = ts.createProgram([sourceFile.fileName], Lint.createCompilerOptions());
        var checker = program.getTypeChecker();
        return this.applyWithWalker(new BooleanTriviaWalker(checker, program.getSourceFile(sourceFile.fileName), this.getOptions()));
    };
    Rule.FAILURE_STRING_FACTORY = function (name, currently) { return ("Tag boolean argument as '" + name + "' (currently '" + currently + "')"); };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var BooleanTriviaWalker = (function (_super) {
    __extends(BooleanTriviaWalker, _super);
    function BooleanTriviaWalker(checker, file, opts) {
        _super.call(this, file, opts);
        this.checker = checker;
    }
    BooleanTriviaWalker.prototype.visitCallExpression = function (node) {
        _super.prototype.visitCallExpression.call(this, node);
        if (node.arguments && node.arguments.some(function (arg) { return arg.kind === ts.SyntaxKind.TrueKeyword || arg.kind === ts.SyntaxKind.FalseKeyword; })) {
            var targetCallSignature = this.checker.getResolvedSignature(node);
            if (!!targetCallSignature) {
                var targetParameters = targetCallSignature.getParameters();
                var source = this.getSourceFile();
                for (var index = 0; index < targetParameters.length; index++) {
                    var param = targetParameters[index];
                    var arg = node.arguments[index];
                    if (!(arg && param)) {
                        continue;
                    }
                    var argType = this.checker.getContextualType(arg);
                    if (argType && (argType.getFlags() & ts.TypeFlags.Boolean)) {
                        if (arg.kind !== ts.SyntaxKind.TrueKeyword && arg.kind !== ts.SyntaxKind.FalseKeyword) {
                            continue;
                        }
                        var triviaContent = void 0;
                        var ranges = ts.getLeadingCommentRanges(arg.getFullText(), 0);
                        if (ranges && ranges.length === 1 && ranges[0].kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                            triviaContent = arg.getFullText().slice(ranges[0].pos + 2, ranges[0].end - 2); // +/-2 to remove /**/
                        }
                        var paramName = param.getName();
                        if (triviaContent !== paramName && triviaContent !== paramName + ":") {
                            this.addFailure(this.createFailure(arg.getStart(source), arg.getWidth(source), Rule.FAILURE_STRING_FACTORY(param.getName(), triviaContent)));
                        }
                    }
                }
            }
        }
    };
    return BooleanTriviaWalker;
}(Lint.RuleWalker));
