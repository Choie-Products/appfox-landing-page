const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Compile the project's TypeScript in memory; no generated files or network requests.
module.exports = function load(file, mocks = {}, globals = {}) {
  const filename = path.resolve(__dirname, "..", file);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : require(id),
    console: { error() {}, warn() {}, log() {} },
    process, Request, Response, URL, URLSearchParams, ...globals,
  }, { filename });
  return module.exports;
};
