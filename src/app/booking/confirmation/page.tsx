'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, MessageCircle, Home, MapPin, Calendar, Clock, User, Scissors } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('lastBooking')
    if (data) {
      setBooking(JSON.parse(data))
    }
  }, [])

  if (!booking) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <div className="text-center">
           <div className="text-6xl mb-6">🤔</div>
           <p className="text-brand-accent mb-6 font-medium">Запись не найдена или уже завершена.</p>
           <Link href="/" className="bg-brand-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-accent/20 inline-block">Вернуться на главную</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white border border-brand-accent/10 rounded-[3rem] p-10 md:p-14 text-center shadow-2xl shadow-zinc-200/50">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif mb-4 uppercase font-black text-brand-text">Готово!</h1>
        <p className="text-brand-accent mb-12 font-medium">Ваш визит в Oldway Barbershop успешно запланирован.</p>
        
        <div className="bg-brand-bg rounded-[2rem] p-8 text-left space-y-6 mb-10 border border-brand-accent/10">
           <div className="flex items-start gap-5">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <Scissors className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-brand-accent uppercase font-black tracking-[0.1em] mb-1">Ваша Услуга</div>
                <div className="font-bold text-lg">{booking.service?.name}</div>
              </div>
           </div>
           <div className="flex items-start gap-5 border-t border-brand-accent/10 pt-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <User className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-brand-accent uppercase font-black tracking-[0.1em] mb-1">Ваш Мастер</div>
                <div className="font-bold text-lg">{booking.barber?.name}</div>
              </div>
           </div>
           <div className="flex items-start gap-5 border-t border-brand-accent/10 pt-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <Calendar className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-brand-accent uppercase font-black tracking-[0.1em] mb-1">Дата и Время</div>
                <div className="font-bold text-lg">
                  {format(new Date(booking.dateTime), 'd MMMM', { locale: ru })} в {format(new Date(booking.dateTime), 'HH:mm')}
                </div>
              </div>
           </div>
           <div className="flex items-start gap-5 border-t border-brand-accent/10 pt-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <div className="text-[10px] text-brand-accent uppercase font-black tracking-[0.1em] mb-1">Место Встречи</div>
                <div className="font-bold text-lg">ул. Сыганак, 33, Астана</div>
              </div>
           </div>
        </div>

        <div className="grid gap-4">
          <a 
            href={booking.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-green-500/30 uppercase tracking-widest text-sm"
          >
            <MessageCircle className="w-6 h-6" />
            Пожалуйста, подтвердите запись в WhatsApp
          </a>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-brand-accent/10 py-5 rounded-2xl font-black hover:bg-brand-bg transition-all text-brand-accent uppercase tracking-widest text-sm"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
