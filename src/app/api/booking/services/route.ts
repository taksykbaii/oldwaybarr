import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const services = await prisma.service.findMany({
    include: {
      barbers: {
        select: {
          price: true
        }
      }
    }
  })
  return NextResponse.json(services)
}
