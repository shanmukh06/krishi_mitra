'use client'
import { useState } from 'react'

export default function AdvisoryPage() {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [advisory, setAdvisory] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchAdvisory = async () => {
    setLoading(true)
    try {
      const [lat, lng] = location.split(',').map(Number)
      const res = await fetch(`http://localhost:8000/advisory?lat=${lat}&lng=${lng}&date=${date}`)
      const data = await res.json()
      setAdvisory(data)
    } catch (err) {
      console.error('Failed to fetch advisory:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FarmAI Advisory System</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Coordinates (lat,lng):</label>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
          placeholder="12.34,56.78"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Date:</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <button 
        onClick={fetchAdvisory}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Loading...' : 'Get Advisory'}
      </button>

      {advisory && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Advisory Results</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(advisory, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}