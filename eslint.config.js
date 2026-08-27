const expoConfig = require("eslint-config-expo/flat");

const expoRules = Array.isArray(expoConfig)
  ? expoConfig
  : [expoConfig];

module.exports = [
  {
    ignores: [
      "dist/**",
      ".expo/**",
      "coverage/**",
    ],
  },

  ...expoRules,

  {
    files: [
      "eslint.config.js",
      "jest.config.js",
    ],

    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
  },

  {
    files: [
      "tests/**/*.test.ts",
      "tests/**/*.test.tsx",
    ],

    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        jest: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
];
