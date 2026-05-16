import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay, addDays, format, parseISO, isBefore, startOfHour, addHours } from 'date-fns'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const barberId = searchParams.get('barberId')
  const dateStr = searchParams.get('date') // YYYY-MM-DD

  if (!barberId || !dateStr) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const date = parseISO(dateStr)
  const start = startOfDay(date)
  const end = endOfDay(date)

  // Get blocked slots from Admin
  const blockedSlots = await prisma.availabilitySlot.findMany({
    where: {
      barberId,
      dateTime: { gte: start, lte: end },
      isBlocked: true
    }
  })

  // Get existing bookings
  const bookings = await prisma.booking.findMany({
    where: {
      barberId,
      dateTime: { gte: start, lte: end },
      status: 'confirmed'
    }
  })

  // Define business hours 10:00 - 21:00
  const slots = []
  for (let hour = 10; hour < 21; hour++) {
    const slotTime = new Date(date)
    slotTime.setHours(hour, 0, 0, 0)
    
    // Check if in the past
    if (isBefore(slotTime, new Date())) continue

    const isBlocked = blockedSlots.some(s => s.dateTime.getTime() === slotTime.getTime())
    const isBooked = bookings.some(b => b.dateTime.getTime() === slotTime.getTime())

    if (!isBlocked && !isBooked) {
      slots.push(slotTime.toISOString())
    }
  }

  // Ensure they are sorted
  const sortedSlots = slots.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  return NextResponse.json({ slots: sortedSlots })
}
