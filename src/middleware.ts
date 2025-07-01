import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // We only want to protect the /admin route
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    // The value is base64 encoded
    const [user, pwd] = atob(authValue).split(':')

    // Get the expected credentials from environment variables
    // with fallbacks for development
    const expectedUser = process.env.ADMIN_USERNAME ?? 'admin'
    const expectedPassword = process.env.ADMIN_PASSWORD ?? 'password'

    if (user === expectedUser && pwd === expectedPassword) {
      return NextResponse.next()
    }
  }

  // If authentication fails or is missing, demand it
  const response = new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
  return response
}

// Ensure the middleware runs on the /admin path
export const config = {
  matcher: ['/admin/:path*'],
}
