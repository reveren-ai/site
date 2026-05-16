import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pre-launch gate. When LAUNCH_MODE === "coming-soon" is set on Vercel's
// Production environment scope (and only there), every UI request is
// rewritten to /coming-soon so visitors to reveren.ai (and any subpath)
// see only the holding page.
//
// Allowlist preserves anything the holding page itself needs to function:
// the API route for waitlist signups, Next.js internal assets, the public
// /og + /logo image dirs, and the SEO crawler files (robots.txt, sitemap).
// Anything else gets rewritten — URL preserved (so the rewritten path
// still appears in the browser bar), content swapped to /coming-soon.
// The metadata.alternates.canonical on /coming-soon collapses all
// rewritten variants back to https://reveren.ai/ for search engines.
//
// To launch: remove the LAUNCH_MODE env var from Vercel Production and
// redeploy. The middleware no-ops, the full marketing site renders again.
// Reversible in seconds; no code change required.

export function middleware(request: NextRequest) {
  if (process.env.LAUNCH_MODE !== "coming-soon") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname === "/coming-soon" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/og/") ||
    pathname.startsWith("/logo/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Preserve the path the user originally requested in a search param so the
  // /coming-soon holding page can show "you tried /pricing — sign up and we'll
  // notify you when it's live". Without this, a Slack paste of
  // https://reveren.ai/pricing loses every signal about the sender's intent;
  // the recipient just sees a generic holding page.
  const url = request.nextUrl.clone();
  const originalPath = pathname;
  url.pathname = "/coming-soon";
  if (originalPath !== "/" && originalPath !== "/coming-soon") {
    url.searchParams.set("from", originalPath);
  }
  return NextResponse.rewrite(url);
}

// Skip middleware on static asset extensions to avoid unnecessary
// invocations. The handler itself enforces the actual allowlist.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf|css|js)).*)",
  ],
};
