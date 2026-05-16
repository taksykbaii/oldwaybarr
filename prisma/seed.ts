import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // Clear existing data
  await prisma.availabilitySlot.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.barberService.deleteMany()
  await prisma.barber.deleteMany()
  await prisma.service.deleteMany()

  // Create Services
  const service1 = await prisma.service.create({
    data: {
      name: 'Мужская стрижка',
      description: 'Классическая стрижка, мытье головы, укладка'
    }
  })
  const service2 = await prisma.service.create({
    data: {
      name: 'Стрижка бороды',
      description: 'Оформление бороды и усов, четкие контуры'
    }
  })
  const service3 = await prisma.service.create({
    data: {
      name: 'Комплекс (Стрижка + Борода)',
      description: 'Полное обновление вашего образа'
    }
  })
  const service4 = await prisma.service.create({
    data: {
      name: 'Бритье опасной бритвой',
      description: 'Традиционное бритье с распариванием'
    }
  })

  // Create Barbers
  const barbersData = [
    { name: 'Мейрамбек', specialization: 'Топ-барбер', photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400' },
    { name: 'Дамир', specialization: 'Барбер', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Али', specialization: 'Барбер', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Санжар', specialization: 'Младший барбер', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  ]

  const services = [service1, service2, service3, service4]

  for (const bData of barbersData) {
    const barber = await prisma.barber.create({
      data: {
        name: bData.name,
        specialization: bData.specialization,
        photoUrl: bData.photoUrl,
      }
    })

    // Assign services to barber with random prices
    for (const service of services) {
        let basePrice = 5000
        if (service.name.includes('бороды')) basePrice = 3000
        if (service.name.includes('Комплекс')) basePrice = 7000
        if (service.name.includes('Бритье')) basePrice = 4000

        // Adjust based on specialization
        if (bData.specialization === 'Топ-барбер') basePrice += 2000
        if (bData.specialization === 'Младший барбер') basePrice -= 1000

        await prisma.barberService.create({
            data: {
                barberId: barber.id,
                serviceId: service.id,
                price: basePrice
            }
        })
    }
  }

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
