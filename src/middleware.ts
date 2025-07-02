import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  // If the env vars are not set, deny access. This is a security best practice.
  if (!expectedUser || !expectedPassword) {
    console.error("ADMIN_USERNAME or ADMIN_PASSWORD is not set in the deployment environment. Access to /admin is denied.");
    // We send a more helpful error page to the client to explain the configuration issue.
    const body = `
      <div style="font-family: sans-serif; padding: 2rem;">
        <h1>500 - Server Configuration Error</h1>
        <p>The admin dashboard cannot be accessed because it is not properly configured on the server.</p>
        <p><strong>Action Required:</strong> If you are the site administrator, please add the <code>ADMIN_USERNAME</code> and <code>ADMIN_PASSWORD</code> environment variables to your deployment provider's settings.</p>
      </div>
    `;
    return new NextResponse(body, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
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
      // By using a unique realm each time, we force the browser to re-prompt.
      'WWW-Authenticate': `Basic realm="Secure Area - ${Date.now()}"`,
    },
  })
  return response
}

// Ensure the middleware runs on the /admin path and all sub-paths
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
