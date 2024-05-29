import { NextResponse } from 'next/server';
import { MiddlewareResponse } from '@netlify/next';

// https://www.propelauth.com/post/getting-url-in-next-server-components
// https://docs.netlify.com/frameworks/next-js/runtime-v4/middleware/
// https://www.netlify.com/with/nextjs/

export function middleware(nextRequest) {
  const headers = new Headers(nextRequest.headers);
  headers.set('x-current-path', nextRequest.nextUrl.pathname);
  const request = new MiddlewareResponse(NextResponse.next({ headers }));
  return request;
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};