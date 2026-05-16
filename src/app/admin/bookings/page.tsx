'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar, Phone, User, Scissors, Trash2 } from 'lucide-react'

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings')
    const data = await res.json()
    setBookings(data)
    setLoading(false)
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту запись?')) return
    await fetch(`/api/admin/bookings?id=${id}`, { method: 'DELETE' })
    fetchBookings()
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-serif uppercase">Записи</h1>
        <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Всего: {bookings.length}</div>
      </div>

      {loading ? (
        <div className="text-zinc-500">Загрузка...</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-6 items-center">
                 <div className="text-center bg-zinc-800 p-3 rounded-xl min-w-[100px]">
                    <div className="text-xs text-zinc-500 uppercase font-bold">{format(new Date(booking.dateTime), 'EEEE', { locale: ru })}</div>
                    <div className="text-xl font-bold">{format(new Date(booking.dateTime), 'd MMM', { locale: ru })}</div>
                    <div className="text-brand-accent font-bold">{format(new Date(booking.dateTime), 'HH:mm')}</div>
                 </div>
                 
                 <div>
                    <h3 className="text-xl font-bold mb-1">{booking.clientName}</h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                       <Phone className="w-3 h-3" /> {booking.clientPhone}
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-4">
                 <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Мастер</div>
                    <div className="flex items-center gap-2 text-sm">
                       <User className="w-3 h-3 text-brand-accent" /> {booking.barber?.name}
                    </div>
                 </div>
                 <div className="bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Услуга</div>
                    <div className="flex items-center gap-2 text-sm">
                       <Scissors className="w-3 h-3 text-brand-accent" /> {booking.service?.name} 
                       <span className="text-zinc-500 ml-2">
                         ({booking.barber?.services.find((s:any) => s.serviceId === booking.serviceId)?.price} ₸)
                       </span>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => deleteBooking(booking.id)}
                className="p-3 text-zinc-600 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {bookings.length === 0 && <div className="text-center py-20 text-zinc-500">Записей пока нет</div>}
        </div>
      )}
    </div>
  )
}
