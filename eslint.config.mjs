import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["node_modules", ".next", "dist", "build"],
  },
  ...nextConfig,
];

export default config;
