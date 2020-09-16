const loaderUtils = require("loader-utils");
const recast = require("recast");
const {
  identifier: id,
  memberExpression,
  callExpression,
  awaitExpression,
  functionExpression,
  arrowFunctionExpression,
} = recast.types.builders;
const TNT = recast.types.namedTypes;

// default handle function
const DEFAULT = {
  callback: (err) => {
    console.log(err);
  },
};

module.exports = function (resouce) {
  // options
  const option = { ...DEFAULT, ...loaderUtils.getOptions(this) };
  const callback = option.callback ? option.callback.toString() : null;

  const ast = recast.parse(resouce);
  let error = null;

  recast.visit(ast, {
    visitAwaitExpression(path) {
      const { node } = path;
      let need = node.argument;
      let newBodyCode; 

      if (TNT.CallExpression.check(need)) {
        // old code body
        const codeBody = recast.parse(callback).program.body[0];
        if (TNT.FunctionDeclaration.check(codeBody)) {
          newBodyCode = functionExpression(
            codeBody.id,
            codeBody.params,
            codeBody.body
          );
        } else if (TNT.ArrowFunctionExpression.check(codeBody.expression)) {
          newBodyCode = arrowFunctionExpression(
            codeBody.expression.params,
            codeBody.expression.body
          );
        } else {
          error = new Error("param callback must be a function");
          return false;
        }
        // create thenFunc and newFunc
        const thenFunc = callExpression(id("catch"), [newBodyCode]);
        const originFunc = callExpression(need.callee, need.arguments);
        const newFunc = memberExpression(originFunc, thenFunc);

        // await concat newFunc code
        const awaitLeft = awaitExpression(newFunc);

        // replace code
        path.replace(awaitLeft);
      }
      return false;
    },
  });
  if (error) {
    return error;
  }
  var result = recast.print(ast).code;

  this.callback(null, result);
};
