import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { name, specialization, photoUrl } = body

  const barber = await prisma.barber.update({
    where: { id },
    data: {
      name,
      specialization,
      photoUrl,
    },
  })

  return NextResponse.json(barber)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.barber.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
