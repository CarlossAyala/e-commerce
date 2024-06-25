import globals from "globals";
import pluginJs from "@eslint/js";
import recommended from "eslint-plugin-react/configs/recommended.js";
import jsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import hooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        Intl: true,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      "react-hooks": hooks,
    },
    rules: hooks.configs.recommended.rules,
  },
  {
    files: ["**/*.jsx"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  recommended,
  jsxRuntime,
  prettier,
  {
    rules: {
      "react/prop-types": [0],
    },
  },
];
