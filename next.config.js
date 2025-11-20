
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["raw.githubusercontent.com"],
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

  // Don't try to statically generate API routes
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;








// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       config.externals = [...(config.externals || []), 'styled-jsx', 'styled-jsx/style'];
//     }
//     return config;
//   },
//   // Don't try to statically generate API routes
//   experimental: {
//     serverActions: {
//       bodySizeLimit: '2mb',
//     },
//   },
// }

// module.exports = nextConfig
