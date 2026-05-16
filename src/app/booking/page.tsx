'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Calendar, Clock, User, Scissors, CheckCircle2, Phone } from 'lucide-react'
import { format, addDays, isSameDay } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'

type Step = 'service' | 'barber' | 'datetime' | 'details'

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('service')
  const [services, setServices] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedBarber, setSelectedBarber] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '' })
  
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/booking/services').then(res => res.json()).then(data => {
      if (Array.isArray(data)) {
        setServices(data)
      } else {
        console.error('Services data is not an array:', data)
        setServices([])
      }
    }).catch(err => {
      console.error('Failed to fetch services:', err)
      setServices([])
    })

    fetch('/api/booking/barbers').then(res => res.json()).then(data => {
      if (Array.isArray(data)) {
        setBarbers(data)
      } else {
        console.error('Barbers data is not an array:', data)
        setBarbers([])
      }
    }).catch(err => {
      console.error('Failed to fetch barbers:', err)
      setBarbers([])
    })
  }, [])

  useEffect(() => {
    if (selectedBarber && selectedDate) {
      setLoading(true)
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      fetch(`/api/booking/availability?barberId=${selectedBarber.id}&date=${dateStr}`)
        .then(res => res.json())
        .then(data => {
          const slots = data.slots || []
          // Sort slots ascending
          const sortedSlots = slots.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime())
          setAvailableSlots(sortedSlots)
          setLoading(false)
        })
    }
  }, [selectedBarber, selectedDate])

  const handleBooking = async () => {
    if (!selectedTime) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientInfo.name,
          clientPhone: clientInfo.phone,
          barberId: selectedBarber.id,
          serviceId: selectedService.id,
          dateTime: selectedTime
        })
      })
      const data = await res.json()
      if (res.ok) {
        const message = `Здравствуйте! Вы записаны в Oldway Barbershop. %0AМастер: ${selectedBarber.name}%0AУслуга: ${selectedService.name}%0AДата: ${format(new Date(selectedTime), 'PPP', { locale: ru })}%0AВремя: ${format(new Date(selectedTime), 'HH:mm')}%0AАдрес: ул. Сыганак, 33`
        const waLink = `https://wa.me/${clientInfo.phone.replace(/\D/g, '')}?text=${message}`
        
        localStorage.setItem('lastBooking', JSON.stringify({
          ...data,
          waLink
        }))
        router.push('/booking/confirmation')
      } else {
        alert(data.error)
      }
    } catch (err) {
      alert('Ошибка при бронировании')
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 'service' && selectedService) setStep('barber')
    else if (step === 'barber' && selectedBarber) setStep('datetime')
    else if (step === 'datetime' && selectedTime) setStep('details')
  }

  const prevStep = () => {
    if (step === 'barber') setStep('service')
    else if (step === 'datetime') setStep('barber')
    else if (step === 'details') setStep('datetime')
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-brand-accent hover:text-brand-accent mb-8 transition-colors font-bold uppercase tracking-widest text-xs">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад на главную
        </Link>

        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -z-10" />
          {['service', 'barber', 'datetime', 'details'].map((s, i) => (
            <div 
              key={s}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 font-bold ${
                step === s ? 'bg-brand-accent border-brand-accent text-white scale-110 shadow-lg shadow-brand-accent/30' : 
                ['service', 'barber', 'datetime', 'details'].indexOf(step) > i ? 'bg-zinc-100 border-brand-accent/10 text-brand-accent' :
                'bg-white border-brand-accent/10 text-brand-accent'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white shadow-2xl shadow-zinc-200/50 p-8 md:p-12 rounded-[2.5rem] border border-brand-accent/10"
          >
            {step === 'service' && (
              <div>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
                  <Scissors className="text-brand-accent" /> Выберите услугу
                </h2>
                <div className="space-y-4">
                  {services.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                        selectedService?.id === s.id ? 'border-brand-accent bg-brand-accent/10 shadow-md' : 'border-brand-accent/10 hover:border-brand-accent/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                          <p className="text-brand-accent text-sm">{s.description}</p>
                        </div>
                        <div className="text-brand-accent font-black text-lg">от {Math.min(...(s.barbers?.map((b:any)=>b.price) || [0]))} ₸</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'barber' && (
              <div>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
                  <User className="text-brand-accent" /> Выберите мастера
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {barbers.filter(b => !selectedService || b.services.some((bs:any) => bs.serviceId === selectedService.id)).map(b => {
                    const barberService = b.services.find((bs:any) => bs.serviceId === selectedService?.id)
                    return (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBarber(b)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                          selectedBarber?.id === b.id ? 'border-brand-accent bg-brand-accent/10 shadow-md' : 'border-brand-accent/10 hover:border-brand-accent/10'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-zinc-100 overflow-hidden shrink-0">
                          {b.photoUrl ? (
                            <img src={b.photoUrl} alt={b.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-accent"><User className="w-8 h-8" /></div>
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg">{b.name}</h3>
                          <p className="text-brand-accent text-xs uppercase tracking-widest font-bold mb-1">{b.specialization}</p>
                          {barberService && <p className="text-brand-accent font-bold text-sm">{barberService.price} ₸</p>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 'datetime' && (
              <div>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
                  <Calendar className="text-brand-accent" /> Дата и время
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                  {[...Array(14)].map((_, i) => {
                    const date = addDays(new Date(), i)
                    return (
                      <button
                        key={i}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`flex-shrink-0 w-20 py-5 rounded-2xl border-2 flex flex-col items-center transition-all ${
                          isSameDay(selectedDate, date) ? 'border-brand-accent bg-brand-accent text-white shadow-lg shadow-brand-accent/30' : 'border-brand-accent/10 hover:border-brand-accent/10 text-brand-accent bg-brand-bg'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-black mb-1 tracking-tighter">{format(date, 'eee', { locale: ru })}</span>
                        <span className="text-2xl font-black">{format(date, 'd')}</span>
                      </button>
                    )
                  })}
                </div>
                
                {loading ? (
                  <div className="py-12 text-center text-brand-accent font-medium">Загрузка свободных слотов...</div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.length > 0 ? availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-4 rounded-xl border-2 transition-all font-bold text-lg ${
                          selectedTime === slot ? 'border-brand-accent bg-brand-accent/10 text-brand-accent shadow-sm' : 'border-brand-accent/10 hover:border-brand-accent/10 text-brand-accent bg-brand-bg'
                        }`}
                      >
                        {format(new Date(slot), 'HH:mm')}
                      </button>
                    )) : (
                      <div className="col-span-full py-12 text-center text-brand-accent font-medium">Нет доступного времени на этот день</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 'details' && (
              <div>
                <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
                  <Phone className="text-brand-accent" /> Ваши контакты
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs text-brand-accent uppercase tracking-widest font-black mb-3">Ваше Имя</label>
                    <input 
                      type="text" 
                      value={clientInfo.name}
                      onChange={e => setClientInfo({ ...clientInfo, name: e.target.value })}
                      className="w-full bg-brand-bg border-2 border-brand-accent/10 rounded-2xl p-5 focus:border-brand-accent outline-none transition-all text-lg font-bold"
                      placeholder="Имя Фамилия"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-brand-accent uppercase tracking-widest font-black mb-3">Номер Телефона</label>
                    <input 
                      type="tel" 
                      value={clientInfo.phone}
                      onChange={e => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      className="w-full bg-brand-bg border-2 border-brand-accent/10 rounded-2xl p-5 focus:border-brand-accent outline-none transition-all text-lg font-bold"
                      placeholder="+7 777 777 77 77"
                    />
                  </div>
                  <div className="bg-brand-bg border-2 border-brand-accent/10 rounded-3xl p-8 mt-10">
                    <h4 className="text-brand-accent font-black uppercase tracking-widest text-xs mb-6">Резюме записи</h4>
                    <div className="space-y-4 text-brand-accent font-medium">
                      <div className="flex justify-between items-center border-b border-brand-accent/10 pb-3"><span>Услуга</span><span className="text-brand-text font-bold">{selectedService?.name}</span></div>
                      <div className="flex justify-between items-center border-b border-brand-accent/10 pb-3"><span>Мастер</span><span className="text-brand-text font-bold">{selectedBarber?.name}</span></div>
                      <div className="flex justify-between items-center border-b border-brand-accent/10 pb-3"><span>Дата</span><span className="text-brand-text font-bold">{selectedTime && format(new Date(selectedTime), 'd MMMM yyyy', { locale: ru })}</span></div>
                      <div className="flex justify-between items-center"><span>Время</span><span className="text-brand-text font-bold">{selectedTime && format(new Date(selectedTime), 'HH:mm')}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {step !== 'service' && (
                <button 
                  onClick={prevStep}
                  className="flex-1 border-2 border-brand-accent/10 py-5 rounded-2xl font-bold hover:bg-brand-bg transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Назад
                </button>
              )}
              <button 
                onClick={step === 'details' ? handleBooking : nextStep}
                disabled={
                  (step === 'service' && !selectedService) ||
                  (step === 'barber' && !selectedBarber) ||
                  (step === 'datetime' && !selectedTime) ||
                  (step === 'details' && (!clientInfo.name || !clientInfo.phone)) ||
                  submitting
                }
                className="flex-[2] bg-brand-accent hover:bg-zinc-800 text-white py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] shadow-xl shadow-brand-accent/30"
              >
                {submitting ? 'Отправка...' : step === 'details' ? 'Подтвердить' : 'Продолжить'}
                {step !== 'details' && !submitting && <ChevronRight className="w-4 h-4" />}
                {step === 'details' && !submitting && <CheckCircle2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
