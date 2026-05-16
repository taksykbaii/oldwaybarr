import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (password === adminPassword) {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'secret'))

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
