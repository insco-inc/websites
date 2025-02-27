const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { hostname: "insco.io" },
      { hostname: "insco.cn" },
      { hostname: "insco.com.cn" },
      { hostname: "lh3.googleusercontent.com" },
    ],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  env: {
    NEXT_PUBLIC_GIT_COMMIT_SHA: process.env.NEXT_PUBLIC_GIT_COMMIT_SHA,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_COOKIE_BANNER_ID: process.env.NEXT_PUBLIC_COOKIE_BANNER_ID,
    NEXT_PUBLIC_SHOW_PARTICLES: process.env.NEXT_PUBLIC_SHOW_PARTICLES,
    NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY:
      process.env.NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY,
    NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
  },
};

module.exports = withContentlayer(nextConfig);
