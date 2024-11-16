import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./i18n/settings";
import { cacheLngKey, cacheRealSourceKey, basePath } from "./constants";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!backend|_next/static|_next/image|images|videos|assets|favicon.ico|logo.png|ads.txt|sitemap.xml|rss.xml|sw.js).*)",
    { source: "/" },
  ],
};

const getPath = (lng: string) => `${basePath}/${lng}`;

export function middleware(req: NextRequest) {
  let lng;
  if (req.cookies.has(cacheLngKey)) {
    const lngFromCookie = req.cookies.get(cacheLngKey)!.value;
    lng = acceptLanguage.get(lngFromCookie);
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const realSource = req.headers.get("Custom-Real-Source");

  // Redirect if lng in path is not supported
  const pathname = req.nextUrl.pathname;
  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    const response = NextResponse.redirect(
      new URL(
        `${getPath(lng)}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url,
      ),
    );
    if (realSource) response.cookies.set(cacheRealSourceKey, realSource);
    return response;
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cacheLngKey, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
