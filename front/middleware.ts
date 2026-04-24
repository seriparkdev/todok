import { PATHS } from '@/constants/paths';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [PATHS.LOGIN, PATHS.AUTH.KAKAO_CALLBACK] as const;
type PublicPath = (typeof PUBLIC_PATHS)[number];

const hasAuthCookie = (request: NextRequest) =>
  request.cookies.has('access_token') || request.cookies.has('refresh_token');

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.includes(pathname as PublicPath);
  const isAuthenticated = hasAuthCookie(request);

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
  }

  if (isAuthenticated && pathname === PATHS.LOGIN) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
