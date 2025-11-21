import { useEffect, useState } from 'react'
import PondForm from './components/PondForm'
import MeasurementForm from './components/MeasurementForm'
import MeasurementTable from './components/MeasurementTable'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [ponds, setPonds] = useState([])
  const [selected, setSelected] = useState('')
  const [measurements, setMeasurements] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPonds = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/ponds`)
      const data = await res.json()
      setPonds(data)
      if (data.length && !selected) {
        setSelected(data[0].id)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const loadMeasurements = async (pondId) => {
    if (!pondId) return
    try {
      const res = await fetch(`${baseUrl}/api/measurements/${pondId}?limit=100`)
      const data = await res.json()
      setMeasurements(data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => {
    (async () => {
      await loadPonds()
      setLoading(false)
    })()
  }, [])

  useEffect(() => { loadMeasurements(selected) }, [selected])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),transparent_45%)]"></div>
      <div className="relative p-6 max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Aquaculture Water Quality Logger</h1>
          <p className="text-emerald-200/80 mt-2">Register ponds and record temperature, DO, pH, salinity, ammonia, nitrite, and alkalinity. Data persists in the database.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-emerald-400/20 rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-3">Add Pond</h2>
            <PondForm onCreated={() => { loadPonds() }} />
          </div>

          <div className="bg-slate-800/50 border border-emerald-400/20 rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-3">Add Measurement</h2>
            <MeasurementForm ponds={ponds} onCreated={() => { loadMeasurements(selected) }} />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-emerald-400/20 rounded-2xl p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h2 className="text-white font-semibold">Measurements</h2>
            <select value={selected} onChange={e=>setSelected(e.target.value)} className="px-3 py-2 rounded bg-slate-900/40 border border-slate-700 text-white w-full md:w-64">
              <option value="">Select pond</option>
              {ponds.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
          </div>
          {loading ? (
            <div className="text-emerald-200/80">Loading...</div>
          ) : (
            <MeasurementTable data={measurements} />
          )}
        </div>

        <footer className="text-center text-emerald-300/60 text-sm">
          Tips: For shrimp ponds, keep DO > 5 mg/L at night, pH 7.5–8.3, and TAN < 0.5 mg/L. Use aeration and regular water exchange as needed.
        </footer>
      </div>
    </div>
  )
}

export default App
