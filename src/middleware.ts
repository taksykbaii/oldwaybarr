import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET || 'secret')
      )
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (request.nextUrl.pathname === '/api/admin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET || 'secret')
      )
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
