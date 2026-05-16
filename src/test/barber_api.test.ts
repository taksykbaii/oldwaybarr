import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '../lib/prisma'

describe('Barber API Logic', () => {
  beforeAll(async () => {
    await prisma.booking.deleteMany()
    await prisma.availabilitySlot.deleteMany()
    await prisma.barberService.deleteMany()
    await prisma.barber.deleteMany()
  })

  it('can create a barber', async () => {
    const barber = await prisma.barber.create({
      data: {
        name: 'Test Barber',
        specialization: 'Master',
      },
    })
    expect(barber.name).toBe('Test Barber')
    
    const count = await prisma.barber.count()
    expect(count).toBe(1)
  })

  it('can update a barber', async () => {
    const barber = await prisma.barber.findFirst()
    const updated = await prisma.barber.update({
      where: { id: barber!.id },
      data: { name: 'Updated Name' }
    })
    expect(updated.name).toBe('Updated Name')
  })
})
