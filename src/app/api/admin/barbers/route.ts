import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const barbers = await prisma.barber.findMany({
    include: { services: { include: { service: true } } }
  })
  return NextResponse.json(barbers)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, specialization, photoUrl } = body

  const barber = await prisma.barber.create({
    data: {
      name,
      specialization,
      photoUrl,
    },
  })

  return NextResponse.json(barber)
}
