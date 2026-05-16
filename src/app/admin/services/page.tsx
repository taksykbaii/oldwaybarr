'use client'

import { useState, useEffect } from 'react'

interface Service {
  id: string
  name: string
  description: string | null
}

interface Barber {
  id: string
  name: string
}

interface BarberService {
  barberId: string
  serviceId: string
  price: number
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [barberServices, setBarberServices] = useState<BarberService[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null)
  
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [pricingService, setPricingService] = useState<Service | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [resS, resB, resBS] = await Promise.all([
      fetch('/api/admin/services'),
      fetch('/api/admin/barbers'),
      fetch('/api/admin/barbers').then(r => r.json()).then(data => 
        data.flatMap((b: any) => b.services.map((s: any) => ({
          barberId: b.id,
          serviceId: s.serviceId,
          price: s.price
        })))
      )
    ])
    setServices(await resS.json())
    const barbersData = await resB.json()
    setBarbers(barbersData.map((b: any) => ({ id: b.id, name: b.name })))
    setBarberServices(resBS)
  }

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = currentService?.id ? 'PUT' : 'POST'
    const url = currentService?.id ? `/api/admin/services/${currentService.id}` : '/api/admin/services'

    await fetch(url, {
      method,
      body: JSON.stringify(currentService),
      headers: { 'Content-Type': 'application/json' },
    })

    setIsModalOpen(false)
    fetchData()
  }

  const handleUpdatePrice = async (barberId: string, serviceId: string, price: string) => {
    if (price === '') {
        await fetch(`/api/admin/barber-services?barberId=${barberId}&serviceId=${serviceId}`, {
            method: 'DELETE'
        })
    } else {
        await fetch('/api/admin/barber-services', {
            method: 'POST',
            body: JSON.stringify({ barberId, serviceId, price: parseFloat(price) }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    fetchData()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Управление услугами</h1>
        <button
          onClick={() => { setCurrentService({}); setIsModalOpen(true); }}
          className="bg-zinc-100 text-black px-4 py-2 rounded-lg font-medium"
        >
          Добавить услугу
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="text-zinc-400">{service.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { setPricingService(service); setIsPricingModalOpen(true); }}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Настроить цены
              </button>
              <button
                onClick={() => { setCurrentService(service); setIsModalOpen(true); }}
                className="text-zinc-400 hover:text-white"
              >
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">
              {currentService?.id ? 'Редактировать услугу' : 'Новая услуга'}
            </h2>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Название</label>
                <input
                  type="text"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                  value={currentService?.name || ''}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Описание</label>
                <textarea
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
                  value={currentService?.description || ''}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-400">Отмена</button>
                <button type="submit" className="bg-zinc-100 text-black px-6 py-2 rounded-lg font-medium">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {isPricingModalOpen && pricingService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-6">Цены для: {pricingService.name}</h2>
            <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
              {barbers.map(barber => {
                const bs = barberServices.find(x => x.barberId === barber.id && x.serviceId === pricingService.id)
                return (
                  <div key={barber.id} className="flex items-center justify-between gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <span className="font-medium">{barber.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Цена (KZT)"
                        className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 w-32"
                        defaultValue={bs?.price || ''}
                        onBlur={(e) => handleUpdatePrice(barber.id, pricingService.id, e.target.value)}
                      />
                      <span className="text-zinc-500 text-sm">KZT</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setIsPricingModalOpen(false)} className="bg-zinc-100 text-black px-6 py-2 rounded-lg font-medium">Готово</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
