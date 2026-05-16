import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const barbers = await prisma.barber.findMany({
    include: {
      services: true
    }
  })
  return NextResponse.json(barbers)
}
