/**** @type {import('next').NextConfig} ****/
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "raw.githubusercontent.com",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "styled-jsx",
        "styled-jsx/style",
      ];
    }
    return config;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
