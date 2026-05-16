'use client'

import Link from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') return children

  const navItems = [
    { name: 'Записи', href: '/admin/bookings' },
    { name: 'Расписание', href: '/admin/schedule' },
    { name: 'Барберы', href: '/admin/barbers' },
    { name: 'Услуги', href: '/admin/services' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <nav className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-6">Oldway Admin</h2>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === item.href ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-900'
            }`}
          >
            {item.name}
          </a>
        ))}
      </nav>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
