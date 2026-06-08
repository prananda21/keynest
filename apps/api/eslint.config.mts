import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-expect-error eslint-plugin-security does not publish TypeScript declarations.
import security from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  security.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      unicorn,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "comma-spacing": ["warn", { after: true, before: false }],
      curly: ["error", "all"],
      "eol-last": ["warn", "always"],
      eqeqeq: ["error", "always"],
      "keyword-spacing": ["warn", { after: true, before: true }],
      "no-duplicate-imports": ["warn", { allowSeparateTypeImports: true }],
      "no-extra-semi": "warn",
      "no-implicit-coercion": "error",
      "no-multi-spaces": "warn",
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      "no-trailing-spaces": "warn",
      "no-var": "error",
      "object-curly-spacing": ["warn", "always"],
      "object-shorthand": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "semi-spacing": ["warn", { after: true, before: false }],
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w.*\\u0000$"],
            ["^@?\\w"],
            ["^@/.*\\u0000$"],
            ["^@/"],
            ["^\\.\\.?/.*\\u0000$"],
            ["^\\."],
          ],
        },
      ],
      "sort-imports": [
        "warn",
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "space-before-blocks": "warn",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-for-each": "warn",
      "unicorn/no-instanceof-array": "error",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/prevent-abbreviations": "off",
    },
  },
]);
