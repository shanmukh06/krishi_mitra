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
        try {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to get advisory')
        } catch (jsonError) {
          throw new Error(`Server error: ${res.status}`)
        }
      }
      
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format')
      }

      const data = await res.json()
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid advisory data received')
      }
      setAdvisory(data)
    } catch (err) {
      console.error('Advisory error:', err)
      alert(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Krishi Mitra Advisory</h1>
      
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