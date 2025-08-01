import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
