import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { name, description } = body
  const service = await prisma.service.update({
    where: { id },
    data: { name, description }
  })
  return NextResponse.json(service)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
