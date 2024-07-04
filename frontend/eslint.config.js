import globals from "globals";
import pluginJs from "@eslint/js";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: reactHooks.configs.recommended.rules,
  },
  ...fixupConfigRules(reactRecommended),
  ...fixupConfigRules(reactJsxRuntime),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "react/prop-types": "off",
    },
  },
];
