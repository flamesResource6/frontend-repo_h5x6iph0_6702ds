import { useState } from 'react'

export default function PondForm({ onCreated }) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [area, setArea] = useState('')
  const [depth, setDepth] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name,
        species: species || null,
        area_m2: area ? parseFloat(area) : null,
        average_depth_m: depth ? parseFloat(depth) : null
      }
      const res = await fetch(`${baseUrl}/api/ponds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      onCreated && onCreated({ id: data.id, ...payload })
      setName(''); setSpecies(''); setArea(''); setDepth('')
    } catch (err) {
      alert('Failed to create pond: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400"
               placeholder="Pond name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400"
               placeholder="Species (e.g., tilapia, shrimp)" value={species} onChange={e=>setSpecies(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400"
               placeholder="Area m²" value={area} onChange={e=>setArea(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400"
               placeholder="Avg depth m" value={depth} onChange={e=>setDepth(e.target.value)} />
      </div>
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded">
        {loading ? 'Saving...' : 'Add Pond'}
      </button>
    </form>
  )
}
