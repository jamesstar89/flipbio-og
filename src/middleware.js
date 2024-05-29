import { NextResponse } from 'next/server';

// https://www.propelauth.com/post/getting-url-in-next-server-components
// https://docs.netlify.com/frameworks/next-js/runtime-v4/middleware/
// https://www.netlify.com/with/nextjs/

export function middleware(request) {
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};