import { describe, it, expect, vi } from 'vitest'
import { middleware } from './middleware'
import { NextRequest, NextResponse } from 'next/server'

describe('Middleware', () => {
  it('redirects to login if no token for /admin', async () => {
    const req = new NextRequest(new URL('http://localhost:3000/admin'))
    const res = await middleware(req)
    expect(res?.status).toBe(307)
    expect(res?.headers.get('location')).toContain('/admin/login')
  })

  it('allows access to /admin/login without token', async () => {
    const req = new NextRequest(new URL('http://localhost:3000/admin/login'))
    const res = await middleware(req)
    // Next.js middleware returns undefined or NextResponse.next() which doesn't have status usually in this mock
    expect(res?.status).not.toBe(307)
  })

  it('returns 401 if no token for /api/admin', async () => {
    const req = new NextRequest(new URL('http://localhost:3000/api/admin/check'))
    const res = await middleware(req)
    expect(res?.status).toBe(401)
  })
})
