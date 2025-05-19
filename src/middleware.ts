import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Excluded paths that don't require authentication
const publicPaths = ['/admin/login', '/admin/reset-password'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only run this middleware for admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Allow access to public admin paths (login page, reset password)
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get session token from cookie
  const session = request.cookies.get('session')?.value;
  
  // If no session exists, redirect to login
  if (!session) {
    const url = new URL('/admin/login', request.url);
    // Add the current URL as the callbackUrl search parameter
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure the paths where this middleware should run
export const config = {
  matcher: ['/admin/:path*'],
}; 