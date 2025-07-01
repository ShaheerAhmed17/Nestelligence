import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const decodedAuth = Buffer.from(authValue, 'base64').toString('utf-8');
    const [user, pwd] = decodedAuth.split(':')

    const expectedUser = process.env.ADMIN_USERNAME
    const expectedPassword = process.env.ADMIN_PASSWORD

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

// Ensure the middleware runs on the /admin path and all sub-paths
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
