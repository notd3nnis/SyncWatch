import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * ESLint flat config for the SyncWatch backend.
 * Uses TypeScript-ESLint recommended rules and ignores build output.
 */
export default [
  { ignores: ["dist/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];

