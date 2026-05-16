import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      barber: {
        include: {
          services: true
        }
      },
      service: true
    },
    orderBy: {
      dateTime: 'desc'
    }
  })
  return NextResponse.json(bookings)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  
  const booking = await prisma.booking.findUnique({
    where: { id }
  })

  if (booking) {
    await prisma.$transaction([
      prisma.booking.delete({ where: { id } }),
      prisma.availabilitySlot.update({
        where: {
          barberId_dateTime: {
            barberId: booking.barberId,
            dateTime: booking.dateTime
          }
        },
        data: { isBlocked: false }
      })
    ])
  }
  
  return NextResponse.json({ success: true })
}
