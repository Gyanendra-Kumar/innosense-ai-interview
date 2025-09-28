import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Ignore folders/files that shouldn't be linted
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/generated/**", // <--- ignore Prisma generated files
    ],

    // Global rules
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow any globally
    },
  },
];

export default eslintConfig;
