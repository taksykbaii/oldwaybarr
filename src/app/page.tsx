import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Star, Phone, MapPin, Clock, Scissors } from 'lucide-react'
import FadeIn from '@/components/FadeIn'

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.285 2 8.945 2.012 7.882 2.06C6.822 2.109 6.098 2.277 5.469 2.521C4.819 2.773 4.27 3.111 3.722 3.659C3.174 4.207 2.836 4.757 2.584 5.407C2.34 6.035 2.171 6.759 2.123 7.82C2.075 8.882 2.062 9.222 2.062 11.937C2.062 14.652 2.075 14.992 2.123 16.054C2.171 17.115 2.34 17.839 2.584 18.468C2.836 19.117 3.174 19.667 3.722 20.215C4.27 20.763 4.819 21.101 5.469 21.353C6.098 21.597 6.822 21.765 7.882 21.814C8.945 21.862 9.285 21.874 12 21.874C14.715 21.874 15.055 21.862 16.118 21.814C17.178 21.765 17.902 21.597 18.531 21.353C19.181 21.101 19.73 20.763 20.278 20.215C20.826 19.667 21.164 19.117 21.416 18.468C21.66 17.839 21.829 17.115 21.877 16.054C21.925 14.992 21.937 14.652 21.937 11.937C21.937 9.222 21.925 8.882 21.877 7.82C21.829 6.759 21.66 6.035 21.416 5.407C21.164 4.757 20.826 4.207 20.278 3.659C19.73 3.111 19.181 2.773 18.531 2.521C17.902 2.277 17.178 2.109 16.118 2.06C15.055 2.012 14.715 2 12 2ZM12 4.163C14.668 4.163 14.985 4.173 16.039 4.221C17.013 4.266 17.542 4.428 17.894 4.565C18.361 4.746 18.694 4.962 19.044 5.312C19.394 5.662 19.61 5.995 19.791 6.462C19.928 6.814 20.09 7.343 20.134 8.317C20.182 9.371 20.193 9.688 20.193 12.356C20.193 15.025 20.182 15.341 20.134 16.396C20.09 17.37 19.928 17.899 19.791 18.251C19.61 18.718 19.394 19.051 19.044 19.401C18.694 19.751 18.361 19.967 17.894 20.148C17.542 20.285 17.013 20.447 16.039 20.492C14.985 20.54 14.668 20.55 12 20.55C9.332 20.55 9.015 20.54 7.961 20.492C6.987 20.447 6.458 20.285 6.106 20.148C5.639 19.967 5.306 19.751 4.956 19.401C4.606 19.051 4.39 18.718 4.209 18.251C4.072 17.899 3.91 17.37 3.865 18.396C3.818 15.341 3.807 15.025 3.807 12.356C3.807 9.688 3.818 9.371 3.865 8.317C3.91 7.343 4.072 6.814 4.209 6.462C4.39 5.995 4.606 5.662 4.956 5.312C5.306 4.962 5.639 4.746 6.106 4.565C6.458 4.428 6.987 4.266 7.961 4.221C9.015 4.173 9.332 4.163 12 4.163ZM12 7.031C9.29 7.031 7.094 9.227 7.094 11.937C7.094 14.647 9.29 16.843 12 16.843C14.71 16.843 16.906 14.647 16.906 11.937C16.906 9.227 14.71 7.031 12 7.031ZM12 14.681C10.485 14.681 9.256 13.452 9.256 11.937C9.256 10.422 10.485 9.193 12 9.193C13.515 9.193 14.744 10.422 14.744 11.937C14.744 13.452 13.515 14.681 12 14.681ZM18.27 6.801C18.27 7.346 17.828 7.788 17.283 7.788C16.737 7.788 16.295 7.346 16.295 6.801C16.295 6.255 16.737 5.813 17.283 5.813C17.828 5.813 18.27 6.255 18.27 6.801Z" fill="url(#ig-gradient)"/>
    <defs>
      <linearGradient id="ig-gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F58529"/>
        <stop offset="0.25" stopColor="#DD2A7B"/>
        <stop offset="0.5" stopColor="#8134AF"/>
        <stop offset="0.75" stopColor="#515BD4"/>
      </linearGradient>
    </defs>
  </svg>
)

const WhatsAppIcon = ({ color = "#25D366" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.012 2C6.482 2 2 6.482 2 12.012C2 13.78 2.463 15.503 3.342 17.026L2.012 21.895L7.003 20.584C8.461 21.378 10.106 21.801 11.782 21.801C17.312 21.801 21.801 17.319 21.801 11.782C21.801 9.106 20.758 6.589 18.868 4.7C16.978 2.811 14.461 1.768 11.782 1.768L12.012 2ZM11.782 3.435C14.004 3.435 16.084 4.298 17.653 5.867C19.222 7.436 20.085 9.516 20.085 11.738C20.085 16.315 16.359 20.041 11.782 20.041C10.395 20.041 9.034 19.692 7.828 19.03L7.541 18.872L4.568 19.654L5.361 17.218L5.188 16.942C4.461 15.787 4.077 14.453 4.077 13.081C4.077 8.504 7.803 4.778 12.38 4.778C12.38 4.778 11.782 3.435 11.782 3.435ZM15.827 13.238C15.617 13.133 14.582 12.624 14.389 12.554C14.196 12.484 14.056 12.449 13.916 12.659C13.776 12.869 13.373 13.342 13.25 13.482C13.127 13.622 13.004 13.639 12.794 13.534C12.584 13.429 11.907 13.208 11.104 12.492C10.479 11.934 10.057 11.246 9.934 11.036C9.811 10.826 9.921 10.712 10.026 10.608C10.121 10.514 10.237 10.36 10.342 10.237C10.447 10.114 10.482 10.026 10.552 9.886C10.622 9.746 10.587 9.623 10.534 9.518C10.481 9.413 10.078 8.415 9.911 8.012C9.744 7.609 9.577 7.662 9.454 7.662C9.331 7.662 9.191 7.662 9.051 7.662C8.911 7.662 8.683 7.715 8.49 7.925C8.297 8.135 7.754 8.643 7.754 9.676C7.754 10.709 8.507 11.707 8.612 11.847C8.717 11.987 10.093 14.113 12.21 15.023C12.713 15.239 13.106 15.372 13.412 15.469C13.916 15.629 14.375 15.606 14.738 15.552C15.143 15.492 15.986 15.045 16.161 14.555C16.336 14.065 16.336 13.644 16.283 13.556C16.23 13.468 16.089 13.415 15.879 13.31L15.827 13.238Z" fill={color}/>
  </svg>
)

const TwoGISIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#42B141"/>
    <path d="M9.5 28V12H13.5V14.5C13.5 14.5 14.5 12 17.5 12C20.5 12 21.5 14.5 21.5 14.5C21.5 14.5 22.5 12 25.5 12C28.5 12 30.5 14.5 30.5 18.5V28H26.5V19.5C26.5 17.5 25.5 16 24.5 16C23.5 16 22.5 17.5 22.5 19.5V28H18.5V19.5C18.5 17.5 17.5 16 16.5 16C15.5 16 14.5 17.5 14.5 19.5V28H9.5Z" fill="white" className="hidden"/>
    <text x="5" y="26" fill="white" style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>2GIS</text>
  </svg>
)

export default async function HomePage() {
  const barbers = await prisma.barber.findMany()
  const services = await prisma.service.findMany({
    include: { barbers: true }
  })

  const GIS_LINK = "https://go.2gis.com/41yVx"
  const INSTAGRAM_LINK = "https://www.instagram.com/oldway.barbershop/"
  const WHATSAPP_LINK = "https://wa.me/77474078916"

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="text-brand-accent w-8 h-8" />
            <span className="font-serif text-2xl font-bold tracking-tighter">OLDWAY</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <Link href="#about" className="hover:text-brand-accent transition-colors">Главная</Link>
            <Link href="#barbers" className="hover:text-brand-accent transition-colors">Барберы</Link>
            <Link href="#services" className="hover:text-brand-accent transition-colors">Услуги</Link>
            <Link href="#reviews" className="hover:text-brand-accent transition-colors">Отзывы</Link>
            <Link href="#contacts" className="hover:text-brand-accent transition-colors">Контакты</Link>
          </div>

          <Link 
            href="/booking"
            className="bg-brand-accent hover:opacity-90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20"
          >
            ЗАПИСАТЬСЯ
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter uppercase text-brand-text leading-none">
              Настоящий стиль не кричит — <span className="text-brand-accent">его замечают</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-accent mb-10 font-light tracking-wide uppercase">
              Традиции. Стиль. Качество.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                href="/booking"
                className="bg-brand-accent hover:opacity-90 text-white px-12 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-accent/30"
              >
                ЗАПИСАТЬСЯ ОНЛАЙН
              </Link>
              
              <div className="flex items-center gap-4">
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <InstagramIcon />
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <WhatsAppIcon />
                </a>
                <a href={GIS_LINK} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <TwoGISIcon />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 border border-brand-accent/20 translate-x-8 translate-y-8" />
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80" 
                alt="Barbershop Interior"
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif mb-8 uppercase">О НАС</h2>
              <p className="text-brand-accent text-lg leading-relaxed">
                Oldway Barbershop — это больше, чем просто парикмахерская. Это место, где классические традиции мужского груминга встречаются с современным стилем. 
              </p>
              <p className="text-brand-accent text-lg leading-relaxed">
                Мы верим в то, что каждый мужчина заслуживает исключительного сервиса. Наши мастера — эксперты своего дела, которые уделяют внимание каждой детали.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brand-accent/10">
                <div>
                  <div className="text-4xl font-serif text-brand-accent mb-2 font-bold">100+</div>
                  <div className="text-sm text-brand-accent uppercase tracking-widest font-bold">Отзывов 5.0</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-brand-accent mb-2 font-bold">4</div>
                  <div className="text-sm text-brand-accent uppercase tracking-widest font-bold">Топ-мастера</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white/50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 uppercase">Услуги и цены</h2>
              <div className="w-24 h-1 bg-brand-accent mx-auto" />
            </div>
          </FadeIn>
          <div className="space-y-8">
            {services.map((service, idx) => {
              const prices = service.barbers.map(b => b.price)
              const minPrice = prices.length > 0 ? Math.min(...prices) : 0
              return (
                <FadeIn key={service.id} delay={idx * 0.1}>
                  <div className="flex justify-between items-end border-b border-brand-accent/10 pb-6 group">
                    <div className="flex-1 pr-8 text-left">
                      <h3 className="text-2xl font-serif group-hover:text-brand-accent transition-colors uppercase font-bold">{service.name}</h3>
                      <p className="text-brand-text text-sm mt-1">{service.description}</p>
                    </div>
                    <div className="text-2xl font-serif text-brand-accent font-bold whitespace-nowrap">
                      от {minPrice} ₸
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
          <FadeIn>
            <div className="mt-16 text-center">
               <Link href="/booking" className="inline-block bg-brand-accent text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition-all uppercase tracking-widest">Выбрать мастера</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="barbers" className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 uppercase">НАШИ МАСТЕРА</h2>
              <p className="text-brand-accent uppercase tracking-widest font-bold">Профессионалы своего дела</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {barbers.map((barber, idx) => (
              <FadeIn key={barber.id} delay={idx * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-brand-bg rounded-3xl">
                    <img 
                      src={barber.photoUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=500'} 
                      alt={barber.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-serif mb-1 uppercase font-bold">{barber.name}</h3>
                  <p className="text-brand-text text-sm uppercase tracking-widest font-bold">{barber.specialization}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-white/50 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 uppercase">ОТЗЫВЫ</h2>
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-brand-accent text-brand-accent" />)}
              </div>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
            {[
              { name: 'Нурсултан Бахыткерей', text: 'Мейрамбек мастер своего дела всем рекомендую!' },
              { name: 'Mukhammed Ali', text: 'Топовый барбершоп. Чётко подстригли, всё по кайфу. Мастера знают своё дело, атмосфера на уровне. Теперь только сюда! 5 звёзд без разговоров' },
              { name: 'Serikkul Kassymova', text: 'Ребята в барбершопе — просто супер-профессионалы! Делают стрижки на высшем уровне, аккуратно и стильно. Моим трём сыновьям безумно понравилось, остались в восторге!' },
            ].map((review, i) => (
              <FadeIn key={i} delay={i * 0.1} className="h-full">
                <div className="p-10 bg-white shadow-xl shadow-brand-accent/5 italic text-brand-accent rounded-3xl relative h-full flex flex-col justify-between">
                  <span className="text-6xl text-brand-accent/20 absolute top-4 left-4 font-serif">“</span>
                  <p className="relative z-10 mb-8 leading-relaxed text-lg line-clamp-6">"{review.text}"</p>
                  <div className="text-brand-text uppercase tracking-widest text-sm font-black">— {review.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="text-center">
              <a 
                href={GIS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-accent font-bold border-b-2 border-brand-accent pb-1 hover:text-brand-text hover:border-brand-text transition-all uppercase tracking-widest"
              >
                Читать все отзывы на 2ГИС
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="space-y-12">
                <h2 className="text-4xl md:text-5xl font-serif uppercase">КОНТАКТЫ</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-brand-bg flex items-center justify-center rounded-2xl shrink-0">
                      <MapPin className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-brand-accent uppercase tracking-widest font-bold mb-1">Адрес</div>
                      <div className="text-xl font-bold">ул. Сыганак, 33, Астана</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-brand-bg flex items-center justify-center rounded-2xl shrink-0">
                      <Phone className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-brand-accent uppercase tracking-widest font-bold mb-1">Телефон</div>
                      <div className="text-xl font-bold">+7 747 407 89 16</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-brand-bg flex items-center justify-center rounded-2xl shrink-0">
                      <Clock className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-brand-accent uppercase tracking-widest font-bold mb-1">График работы</div>
                      <div className="text-xl font-bold">Ежедневно: 10:00 — 21:00</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                   <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-brand-text text-white rounded-xl font-bold hover:opacity-90 transition-colors uppercase tracking-widest text-sm flex items-center gap-2">
                    <InstagramIcon /> Instagram
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-brand-text text-brand-text rounded-xl font-bold hover:bg-brand-text hover:text-white transition-all uppercase tracking-widest text-sm flex items-center gap-2">
                    <WhatsAppIcon color="currentColor" /> WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border border-brand-accent/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.289196395568!2d71.42398577689978!3d51.1215443387841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424584285642a8b9%3A0xe543593005a7698d!2z0YPQuy4g0KHRi9Cz0LDQvdCw0LogMzMsINCQ0YHRgtCw0L3QsCAwMTAwMDA!5e0!3m2!1sru!2skz!4v1716300000000!5m2!1sru!2skz" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-brand-bg px-4 border-t border-brand-accent/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Scissors className="text-brand-accent w-6 h-6" />
            <span className="font-serif text-xl font-bold tracking-tighter">OLDWAY</span>
          </div>
          <div className="text-brand-text text-sm">
            © {new Date().getFullYear()} OLDWAY BARBERSHOP. Все права защищены.
          </div>
          <Link href="/admin" className="text-brand-accent hover:text-brand-accent transition-colors text-xs uppercase tracking-widest font-bold">Панель управления</Link>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:scale-110 hover:bg-green-600 transition-all active:scale-95 animate-bounce"
      >
        <WhatsAppIcon color="white" />
      </a>
    </div>
  )
}
