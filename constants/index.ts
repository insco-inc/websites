export const cacheLngKey: string = "__insco_blog_lng__";
export const cacheThemeKey: string = "__insco_blog_theme__";
export const cacheRealSourceKey: string = "__insco_blog_source__";
export const basePath =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "" : "";
export const domain =
  process.env.NODE_ENV === "production"
    ? `https://www.insco.io${basePath}`
    : `http://localhost:3000${basePath}`;
export const sitemapUrls = ["support"];
