import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '../lib/prisma'

describe('Service & Pricing API Logic', () => {
  let barber1Id: string
  let barber2Id: string
  let serviceId: string

  beforeAll(async () => {
    await prisma.booking.deleteMany()
    await prisma.availabilitySlot.deleteMany()
    await prisma.barberService.deleteMany()
    await prisma.barber.deleteMany()
    await prisma.service.deleteMany()

    const b1 = await prisma.barber.create({ data: { name: 'Barber 1', specialization: 'Master' } })
    const b2 = await prisma.barber.create({ data: { name: 'Barber 2', specialization: 'Master' } })
    const s = await prisma.service.create({ data: { name: 'Haircut' } })

    barber1Id = b1.id
    barber2Id = b2.id
    serviceId = s.id
  })

  it('can set different prices for different barbers', async () => {
    await prisma.barberService.create({
      data: { barberId: barber1Id, serviceId: serviceId, price: 4000 }
    })
    await prisma.barberService.create({
      data: { barberId: barber2Id, serviceId: serviceId, price: 5000 }
    })

    const bs1 = await prisma.barberService.findUnique({
      where: { barberId_serviceId: { barberId: barber1Id, serviceId } }
    })
    const bs2 = await prisma.barberService.findUnique({
      where: { barberId_serviceId: { barberId: barber2Id, serviceId } }
    })

    expect(bs1?.price).toBe(4000)
    expect(bs2?.price).toBe(5000)
  })
})
