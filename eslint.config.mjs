import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flatCompat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    ignores: ["node_modules", ".next", "dist", "build"],
  },
  ...flatCompat.config({
    extends: ["next/core-web-vitals"],
  }),
];

export default config;
