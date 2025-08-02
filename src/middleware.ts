import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = url.hostname
  if (hostname === 'localhost' || hostname.startsWith('127.') || hostname === '::1') {
    return NextResponse.next()
  }

  console.log('Middleware hostname:', hostname)

  // Force HTTPS
  if (request.headers.get('x-forwarded-proto') === 'http') {
    url.protocol = 'https:'
    return NextResponse.redirect(url)
  }

  // Redirect www to non-www
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace('www.', '')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
