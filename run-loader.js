const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

function a(err) {
  console.log(err);
}

runLoaders(
  {
    resource: path.join(__dirname, "./src/test.js"),
    loaders: [
      {
        loader: path.join(__dirname, "./src/index.js"),
        options: {
          // null,
          callback: a,
        },
      },
    ],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
  },
  (err, res) => {
    err ? console.log(err) : console.log(res);
  }
);
