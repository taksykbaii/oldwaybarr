import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.barberService.deleteMany()
  await prisma.service.deleteMany()
  await prisma.barber.deleteMany()

  const services = [
    { name: 'Мужская стрижка', description: 'Классическая или современная стрижка на ваш выбор' },
    { name: 'Стрижка бороды', description: 'Оформление бороды и усов' },
    { name: 'Королевское бритье', description: 'Традиционное бритье опасной бритвой с горячим компрессом' },
    { name: 'Комплекс (Стрижка + Борода)', description: 'Полный уход за головой и лицом' },
  ]

  const createdServices = await Promise.all(
    services.map(s => prisma.service.create({ data: s }))
  )

  const barbers = [
    { name: 'Мейрамбек', specialization: 'Топ-барбер', photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200' },
    { name: 'Дамир', specialization: 'Барбер', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Али', specialization: 'Барбер', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Санжар', specialization: 'Барбер', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
  ]

  for (const b of barbers) {
    const createdBarber = await prisma.barber.create({ data: b })
    for (const s of createdServices) {
      await prisma.barberService.create({
        data: {
          barberId: createdBarber.id,
          serviceId: s.id,
          price: Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000
        }
      })
    }
  }

  console.log('Seed completed!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
