import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Indentation and spacing rules
      "indent": ["error", 2, {
        "SwitchCase": 1,
        "VariableDeclarator": 1,
        "outerIIFEBody": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": { "parameters": 1, "body": 1 },
        "FunctionExpression": { "parameters": 1, "body": 1 },
        "CallExpression": { "arguments": 1 },
        "ArrayExpression": 1,
        "ObjectExpression": 1,
        "ImportDeclaration": 1,
        "flatTernaryExpressions": false,
        "ignoreComments": false
      }],
      "no-tabs": "off", // Allow tabs
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // Allow smart tabs

      // React & Next.js specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "error",
      "react/jsx-indent": ["error", 2], // JSX indentation
      "react/jsx-indent-props": ["error", 2], // JSX props indentation
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/indent": ["error", 2], // TypeScript indentation

      // Import rules
      "import/prefer-default-export": "off",
      "import/no-default-export": "off",
      "import/order": ["error", {
        "groups": [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"]
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }],

      // Code style
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" },
        { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
        { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"]}
      ],

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",

      // Security
      "react/no-danger": "error",
      "@next/next/no-script-in-document": "error",
    }
  },
  {
    // Specific rules for test files
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-props-no-spreading": "off",
    }
  }
];

export default eslintConfig;