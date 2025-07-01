import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  // If the env vars are not set, deny access. This is a security best practice.
  if (!expectedUser || !expectedPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD is not set in the .env file. Access to /admin is denied.");
    // We send a generic 500 error to the client to not leak information.
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    // Check if authValue exists to prevent crashes
    if (authValue) {
      try {
        const decodedAuth = Buffer.from(authValue, 'base64').toString('utf-8');
        const [user, pwd] = decodedAuth.split(':')

        if (user === expectedUser && pwd === expectedPassword) {
          return NextResponse.next()
        }
      } catch (e) {
        console.error("Error decoding authentication credentials:", e);
      }
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
