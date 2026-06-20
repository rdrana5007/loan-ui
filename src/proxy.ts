import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAMESPACE, storageKeys } from "./constants";
// import { canAccessRoute } from "@/utils/routePermissions";

const publicRoutes = ["/login", "/my-profile"];

const getNamespacedCookieName = (key: string) => `${COOKIE_NAMESPACE}__${key}`;

const getCookieValue = <T>(
  request: NextRequest,
  key: string,
): T | undefined => {
  const cookie = request.cookies.get(getNamespacedCookieName(key));

  if (!cookie?.value) return undefined;

  try {
    const parsed = JSON.parse(cookie.value);
    return parsed?.value as T | undefined;
  } catch {
    return undefined;
  }
};

const isPublicRoute = (pathname: string) =>
  publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = getCookieValue<string>(request, storageKeys.ACCESS_TOKEN);
  const hasValidToken = Boolean(accessToken);
  // const userRole = getCookieValue<{ role?: UserRole }>(
  //   request,
  //   storageKeys.USER_PROFILE,
  // )?.role;

  if (!isPublicRoute(pathname) && !hasValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute(pathname) && hasValidToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (hasValidToken && !isPublicRoute(pathname) && userRole) {
  //   // if (!canAccessRoute(userRole, pathname)) {
  //     const redirectPath = pathname === "/" ? "/login" : "/";
  //     return NextResponse.redirect(new URL(redirectPath, request.url));
  //   // }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};