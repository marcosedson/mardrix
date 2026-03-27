import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Turbopack está falhando ao resolver subpaths do Firebase (firebase/app, firebase/auth).
  // Para estabilizar a build e permitir Auth funcionar, desativamos a config explícita do Turbopack.

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
