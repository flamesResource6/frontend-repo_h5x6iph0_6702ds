export default function MeasurementTable({ data }) {
  if (!data?.length) return (
    <div className="text-blue-200/80 text-sm">No measurements yet. Add one to see trends.</div>
  )

  return (
    <div className="overflow-x-auto border border-slate-700/60 rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800/60 text-slate-300">
          <tr>
            <th className="px-3 py-2 text-left">Time</th>
            <th className="px-3 py-2 text-left">Temp °C</th>
            <th className="px-3 py-2 text-left">DO mg/L</th>
            <th className="px-3 py-2 text-left">pH</th>
            <th className="px-3 py-2 text-left">Sal ppt</th>
            <th className="px-3 py-2 text-left">NH3 mg/L</th>
            <th className="px-3 py-2 text-left">NO2 mg/L</th>
            <th className="px-3 py-2 text-left">Alk mg/L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/40">
          {data.map((r) => (
            <tr key={r.id} className="hover:bg-slate-800/40">
              <td className="px-3 py-2 text-slate-200">{new Date(r.timestamp || Date.now()).toLocaleString()}</td>
              <td className="px-3 py-2 text-slate-200">{r.temp_c ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.do_mgL ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.ph ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.salinity_ppt ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.ammonia_mgL ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.nitrite_mgL ?? '-'}</td>
              <td className="px-3 py-2 text-slate-200">{r.alkalinity_mgL ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
