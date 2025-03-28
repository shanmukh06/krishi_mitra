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
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Coordinates</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter latitude,longitude (e.g. 12.34,56.78)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button
                onClick={fetchAdvisory}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Advisory...
                  </>
                ) : 'Get Advisory'}
              </button>
            </div>

            {advisory && (
              <div className="mt-8 space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">Recommended Crops</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {advisory.crops?.map((crop, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-medium text-green-700">{crop}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4">Fertilizer Recommendation</h2>
                  <p className="text-blue-700">{advisory.fertilizer}</p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-4">Planting Schedule</h2>
                  <p className="text-yellow-700">{advisory.schedule}</p>
                </div>

                {advisory.notes?.length > 0 && (
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">Additional Notes</h2>
                    <ul className="space-y-2 text-purple-700">
                      {advisory.notes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}