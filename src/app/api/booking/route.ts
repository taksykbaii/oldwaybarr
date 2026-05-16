import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, clientPhone, barberId, serviceId, dateTime } = body

    if (!clientName || !clientPhone || !barberId || !serviceId || !dateTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const bookingDate = new Date(dateTime)

    // Transaction to prevent double booking
    const result = await prisma.$transaction(async (tx) => {
      // Check if slot is still available
      const existingBooking = await tx.booking.findFirst({
        where: {
          barberId,
          dateTime: bookingDate,
          status: 'confirmed'
        }
      })

      if (existingBooking) {
        throw new Error('This slot is already booked')
      }

      const isBlocked = await tx.availabilitySlot.findFirst({
        where: {
          barberId,
          dateTime: bookingDate,
          isBlocked: true
        }
      })

      if (isBlocked) {
        throw new Error('This slot is blocked by admin')
      }

      const booking = await tx.booking.create({
        data: {
          clientName,
          clientPhone,
          barberId,
          serviceId,
          dateTime: bookingDate,
          status: 'confirmed'
        },
        include: {
          barber: true,
          service: true
        }
      })

      // Automatically block the slot after website booking
      await tx.availabilitySlot.upsert({
        where: {
          barberId_dateTime: {
            barberId,
            dateTime: bookingDate
          }
        },
        update: { isBlocked: true },
        create: {
          barberId,
          dateTime: bookingDate,
          isBlocked: true
        }
      })

      return booking
    })

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
