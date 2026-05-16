import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '../lib/prisma'

describe('Availability API Logic', () => {
  let barberId: string

  beforeAll(async () => {
    await prisma.booking.deleteMany()
    await prisma.availabilitySlot.deleteMany()
    await prisma.barberService.deleteMany()
    await prisma.barber.deleteMany()
    const barber = await prisma.barber.create({ data: { name: 'Test', specialization: 'Test' } })
    barberId = barber.id
  })

  it('can toggle slot availability', async () => {
    const dateTime = new Date()
    dateTime.setHours(10, 0, 0, 0)

    // Create a slot
    await prisma.availabilitySlot.create({
      data: { barberId, dateTime, isBlocked: false }
    })

    // Toggle it
    const updated = await prisma.availabilitySlot.update({
      where: { barberId_dateTime: { barberId, dateTime } },
      data: { isBlocked: true }
    })

    expect(updated.isBlocked).toBe(true)
  })
})
