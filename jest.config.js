const { createDefaultPreset } = require("ts-jest");
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    roots: ["src"],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};