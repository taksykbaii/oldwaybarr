'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Barber {
  id: string
  name: string
  specialization: string
  photoUrl: string | null
}

export default function AdminBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBarber, setCurrentBarber] = useState<Partial<Barber> | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchBarbers()
  }, [])

  const fetchBarbers = async () => {
    const res = await fetch('/api/admin/barbers')
    const data = await res.json()
    setBarbers(data)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setCurrentBarber(prev => ({ ...prev, photoUrl: data.url }))
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Ошибка при загрузке фото')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentBarber) return

    const method = currentBarber.id ? 'PUT' : 'POST'
    const url = currentBarber.id ? `/api/admin/barbers/${currentBarber.id}` : '/api/admin/barbers'

    await fetch(url, {
      method,
      body: JSON.stringify(currentBarber),
      headers: { 'Content-Type': 'application/json' },
    })

    setIsModalOpen(false)
    fetchBarbers()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return
    await fetch(`/api/admin/barbers/${id}`, { method: 'DELETE' })
    fetchBarbers()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Управление барберами</h1>
        <button
          onClick={() => { setCurrentBarber({}); setIsModalOpen(true); }}
          className="bg-zinc-100 text-black px-4 py-2 rounded-lg font-medium"
        >
          Добавить барбера
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div key={barber.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
               {barber.photoUrl ? (
                 <img src={barber.photoUrl} alt={barber.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-600">No Img</div>
               )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{barber.name}</h3>
              <p className="text-zinc-400 mb-4">{barber.specialization}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => { setCurrentBarber(barber); setIsModalOpen(true); }}
                  className="text-sm text-zinc-300 hover:text-white"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(barber.id)}
                  className="text-sm text-red-500 hover:text-red-400"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {currentBarber?.id ? 'Редактировать барбера' : 'Новый барбер'}
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Фотография</label>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700">
                    {currentBarber?.photoUrl ? (
                      <img src={currentBarber.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Нет фото</div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <label className="flex-1">
                    <div className="bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors text-zinc-300 px-4 py-2 rounded-xl text-center cursor-pointer text-sm font-medium">
                      Загрузить фото
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Имя</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-brand-accent outline-none"
                    value={currentBarber?.name || ''}
                    onChange={(e) => setCurrentBarber({ ...currentBarber, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Специализация</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:border-brand-accent outline-none"
                    value={currentBarber?.specialization || ''}
                    onChange={(e) => setCurrentBarber({ ...currentBarber, specialization: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-zinc-500 hover:text-zinc-300 font-medium"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-brand-accent hover:bg-zinc-800 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
