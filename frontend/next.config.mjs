import CopyPlugin from "copy-webpack-plugin";
import { join, dirname } from "path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: join(__dirname, "node_modules/@novorender/api/public/*"),
            to: join(__dirname, "public/novorender/api/[name][ext]"),
          },
        ],
      })
    );
    return config;
  },
};

export default nextConfig;
