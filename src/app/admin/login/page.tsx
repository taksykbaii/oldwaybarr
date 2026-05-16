'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Неверный пароль')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-zinc-900 rounded-xl border border-zinc-800">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Админ-панель
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" title="Пароль" className="sr-only">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-800 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-zinc-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
