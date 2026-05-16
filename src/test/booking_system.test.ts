import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '../lib/prisma'

describe('Public Booking API Logic', () => {
  let barberId: string
  let serviceId: string
  let slotTime: Date

  beforeAll(async () => {
    // Re-seed essential data if missing
    let barber = await prisma.barber.findFirst()
    if (!barber) {
        barber = await prisma.barber.create({ data: { name: 'Test Barber', specialization: 'Test' } })
    }
    barberId = barber.id

    let service = await prisma.service.findFirst()
    if (!service) {
        service = await prisma.service.create({ data: { name: 'Test Service', description: 'Test' } })
    }
    serviceId = service.id

    await prisma.booking.deleteMany()
    await prisma.availabilitySlot.deleteMany()
    
    slotTime = new Date()
    slotTime.setDate(slotTime.getDate() + 1) // Tomorrow to avoid past time issues
    slotTime.setHours(14, 0, 0, 0)
    
    await prisma.availabilitySlot.create({
      data: { barberId, dateTime: slotTime, isBlocked: false }
    })
  })

  it('prevents double booking using transaction', async () => {
    const bookingData = {
      clientName: 'Client 1',
      clientPhone: '111',
      barberId,
      serviceId,
      dateTime: slotTime,
    }

    // Attempting two concurrent bookings for the same slot
    // We use the same logic as in our API route
    const bookingFunc = async (name: string) => {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.booking.findFirst({
                where: { barberId, dateTime: slotTime, status: 'confirmed' }
            })
            if (existing) throw new Error('Already booked')

            return tx.booking.create({
                data: { ...bookingData, clientName: name }
            })
        })
    }

    const results = await Promise.allSettled([
        bookingFunc('Client A'),
        bookingFunc('Client B')
    ])

    const fulfilled = results.filter(r => r.status === 'fulfilled')
    const rejected = results.filter(r => r.status === 'rejected')

    expect(fulfilled.length).toBe(1)
    expect(rejected.length).toBe(1)
    expect((rejected[0] as PromiseRejectedResult).reason.message).toBe('Already booked')
  })
})
