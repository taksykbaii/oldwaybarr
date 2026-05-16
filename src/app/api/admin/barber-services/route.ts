import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { barberId, serviceId, price } = body

  const barberService = await prisma.barberService.upsert({
    where: {
      barberId_serviceId: { barberId, serviceId }
    },
    update: { price },
    create: { barberId, serviceId, price }
  })

  return NextResponse.json(barberService)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const barberId = searchParams.get('barberId')
  const serviceId = searchParams.get('serviceId')

  if (!barberId || !serviceId) {
    return NextResponse.json({ error: 'Missing IDs' }, { status: 400 })
  }

  await prisma.barberService.delete({
    where: {
      barberId_serviceId: { barberId, serviceId }
    }
  })

  return NextResponse.json({ success: true })
}
