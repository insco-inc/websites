const { withContentlayer } = require("next-contentlayer2");

// const basePath =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "/portal" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { hostname: "insco.io" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "visitor-badge.laobi.icu" },
    ],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  env: {
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_COOKIE_BANNER_ID: process.env.NEXT_PUBLIC_COOKIE_BANNER_ID,
    NEXT_PUBLIC_SHOW_PARTICLES: process.env.NEXT_PUBLIC_SHOW_PARTICLES,
    NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY:
      process.env.NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY,
    NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    API_BASE_URL: process.env.API_BASE_URL,
    WS_BASE_URL: process.env.WS_BASE_URL,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    ENCRYPT_IV: process.env.ENCRYPT_IV,
    REQUEST_SIGN_KEY: process.env.REQUEST_SIGN_KEY,
  },
};

module.exports = withContentlayer(nextConfig);
