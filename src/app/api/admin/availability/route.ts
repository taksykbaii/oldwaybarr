import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const barberId = searchParams.get('barberId')
  if (!barberId) return NextResponse.json({ error: 'Missing barberId' }, { status: 400 })

  const slots = await prisma.availabilitySlot.findMany({
    where: { barberId }
  })
  return NextResponse.json(slots)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { barberId, dateTime, isBlocked } = body

  const slot = await prisma.availabilitySlot.upsert({
    where: {
      barberId_dateTime: {
        barberId,
        dateTime: new Date(dateTime)
      }
    },
    update: { isBlocked },
    create: {
      barberId,
      dateTime: new Date(dateTime),
      isBlocked
    }
  })

  return NextResponse.json(slot)
}
