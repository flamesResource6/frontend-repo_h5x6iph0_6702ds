import { useState } from 'react'

export default function MeasurementForm({ ponds, onCreated }) {
  const [pondId, setPondId] = useState('')
  const [temp, setTemp] = useState('')
  const [doVal, setDoVal] = useState('')
  const [ph, setPh] = useState('')
  const [sal, setSal] = useState('')
  const [nh3, setNh3] = useState('')
  const [no2, setNo2] = useState('')
  const [alk, setAlk] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    if (!pondId) return alert('Select a pond')
    setLoading(true)
    try {
      const payload = {
        pond_id: pondId,
        temp_c: temp ? parseFloat(temp) : null,
        do_mgL: doVal ? parseFloat(doVal) : null,
        ph: ph ? parseFloat(ph) : null,
        salinity_ppt: sal ? parseFloat(sal) : null,
        ammonia_mgL: nh3 ? parseFloat(nh3) : null,
        nitrite_mgL: no2 ? parseFloat(no2) : null,
        alkalinity_mgL: alk ? parseFloat(alk) : null
      }
      const res = await fetch(`${baseUrl}/api/measurements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      onCreated && onCreated({ id: data.id, ...payload, timestamp: new Date().toISOString() })
      setTemp(''); setDoVal(''); setPh(''); setSal(''); setNh3(''); setNo2(''); setAlk('')
    } catch (err) {
      alert('Failed to save measurement: ' + err.message)
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <select value={pondId} onChange={e=>setPondId(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white">
        <option value="">Select pond</option>
        {ponds.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
      </select>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="Temp °C" value={temp} onChange={e=>setTemp(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="DO mg/L" value={doVal} onChange={e=>setDoVal(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="pH" value={ph} onChange={e=>setPh(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="Salinity ppt" value={sal} onChange={e=>setSal(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="Ammonia mg/L" value={nh3} onChange={e=>setNh3(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="Nitrite mg/L" value={no2} onChange={e=>setNo2(e.target.value)} />
        <input className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white placeholder-slate-400" placeholder="Alkalinity mg/L" value={alk} onChange={e=>setAlk(e.target.value)} />
      </div>

      <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2 rounded">
        {loading ? 'Saving...' : 'Add Measurement'}
      </button>
    </form>
  )
}
