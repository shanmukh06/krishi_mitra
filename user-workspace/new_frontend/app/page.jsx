'use client'
import { useState } from 'react'

export default function AdvisoryPage() {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [advisory, setAdvisory] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchAdvisory = async () => {
    if (!location || !date) {
      alert('Please enter both location and date')
      return
    }

    setLoading(true)
    setAdvisory(null)
    
    try {
      const [lat, lng] = location.split(',').map(Number)
      if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Please enter valid coordinates (e.g. "12.34,56.78")')
      }

      const res = await fetch(`/api/advisory?lat=${lat}&lng=${lng}&date=${date}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to get advisory')
      }
      
      const data = await res.json()
      setAdvisory(data)
    } catch (err) {
      console.error('Advisory error:', err)
      alert(`Error: ${err.message}`)
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