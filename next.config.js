const withAnalyzer = require('@next/bundle-analyzer');
const { withContentlayer } = require('next-contentlayer');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: getRemotePatterns(),
  },
};

module.exports = withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withContentlayer(nextConfig));

function getRemotePatterns() {
  // add here the remote patterns for your images
  const remotePatterns = [];

  if (SUPABASE_URL) {
    const hostname = new URL(SUPABASE_URL).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        },
      ];
}



// const withAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// const { withContentlayer } = require('next-contentlayer');

// const IS_PRODUCTION = process.env.NODE_ENV === 'production';
// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// function getRemotePatterns() {
//   const remotePatterns = [];

//   if (SUPABASE_URL) {
//     const hostname = new URL(SUPABASE_URL).hostname;
//     remotePatterns.push({
//       protocol: 'https',
//       hostname,
//     });
//   }

//   return IS_PRODUCTION
//     ? remotePatterns
//     : [
//         {
//           protocol: 'http',
//           hostname: '127.0.0.1',
//         },
//       ];
// }

// const nextConfig = {
//   images: {
//     remotePatterns: getRemotePatterns(),
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/search',
//         destination: 'http://127.0.0.1:8000/search/', // Proxy to Backend
//       },
//       // Add more rewrites here as needed
//     ];
//   },
// };

// // Apply both withAnalyzer and withContentlayer to nextConfig
// module.exports = withAnalyzer(withContentlayer(nextConfig));
