'use client'

import { useState, useEffect } from 'react'
import { format, addDays, startOfDay, isSameDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar, User, Clock, Lock, Unlock } from 'lucide-react'

export default function ScheduleAdmin() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [selectedBarber, setSelectedBarber] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [blockedSlots, setBlockedSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/barbers').then(res => res.json()).then(data => {
      setBarbers(data)
      if (data.length > 0) setSelectedBarber(data[0])
    })
  }, [])

  useEffect(() => {
    if (selectedBarber) {
      fetch(`/api/admin/availability?barberId=${selectedBarber.id}`)
        .then(res => res.json())
        .then(data => setBlockedSlots(data))
    }
  }, [selectedBarber])

  const toggleSlot = async (dateTime: string, currentBlocked: boolean) => {
    const res = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barberId: selectedBarber.id,
        dateTime,
        isBlocked: !currentBlocked
      })
    })
    if (res.ok) {
      const updated = await res.json()
      setBlockedSlots(prev => {
        const index = prev.findIndex(s => s.dateTime === updated.dateTime)
        if (index > -1) {
          const next = [...prev]
          next[index] = updated
          return next
        }
        return [...prev, updated]
      })
    }
  }

  const hours = Array.from({ length: 11 }, (_, i) => i + 10) // 10:00 to 20:00

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-serif uppercase">Управление расписанием</h1>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Мастер</h3>
            <div className="space-y-2">
              {barbers.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBarber(b)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    selectedBarber?.id === b.id ? 'border-brand-accent bg-brand-accent/10 text-brand-accent' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                     <img src={b.photoUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'} alt="" />
                  </div>
                  <span className="font-bold">{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Дата</h3>
            <div className="grid grid-cols-2 gap-2">
               {[...Array(7)].map((_, i) => {
                 const d = addDays(new Date(), i)
                 return (
                   <button
                     key={i}
                     onClick={() => setSelectedDate(d)}
                     className={`p-2 rounded-lg border text-center transition-all ${
                       isSameDay(selectedDate, d) ? 'border-brand-accent bg-brand-accent text-black' : 'border-zinc-800 hover:border-zinc-700'
                     }`}
                   >
                     <div className="text-[10px] uppercase font-bold">{format(d, 'eee', { locale: ru })}</div>
                     <div className="font-bold">{format(d, 'd MMM', { locale: ru })}</div>
                   </button>
                 )
               })}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
           <div className="flex items-center gap-4 mb-8">
              <Clock className="text-brand-accent" />
              <h2 className="text-2xl font-serif">Слоты на {format(selectedDate, 'd MMMM', { locale: ru })}</h2>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hours.map(hour => {
                const dt = new Date(selectedDate)
                dt.setHours(hour, 0, 0, 0)
                const dtStr = dt.toISOString()
                const isBlocked = blockedSlots.find(s => new Date(s.dateTime).getTime() === dt.getTime())?.isBlocked || false

                return (
                  <button
                    key={hour}
                    onClick={() => toggleSlot(dtStr, isBlocked)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isBlocked ? 'bg-red-500/5 border-red-500/20 text-red-500' : 'bg-green-500/5 border-green-500/20 text-green-500'
                    }`}
                  >
                    <span className="font-bold text-lg">{hour}:00</span>
                    <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest">
                       {isBlocked ? (
                         <> <Lock className="w-4 h-4" /> Закрыто </>
                       ) : (
                         <> <Unlock className="w-4 h-4" /> Открыто </>
                       )}
                    </div>
                  </button>
                )
              })}
           </div>
           
           <p className="mt-8 text-zinc-500 text-sm">
             * Нажмите на слот, чтобы заблокировать или открыть его для онлайн-записи.
           </p>
        </div>
      </div>
    </div>
  )
}
