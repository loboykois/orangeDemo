import js from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintConfigPlaywright from "eslint-plugin-playwright";

/**@type {import("eslint").Linter.FlatConfig} */
export default tsEslint.config(
  {
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ["node_modules"],
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...global.es2021,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintConfigPlaywright.rules,
      ...eslintConfigPlaywright.rules["no-wait-for-timeout"],
    },
  },
);
