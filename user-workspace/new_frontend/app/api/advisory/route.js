export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const date = searchParams.get('date')

  try {
    const backendResponse = await fetch(
      `http://localhost:8000/advisory?lat=${lat}&lng=${lng}&date=${date}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    
    const contentType = backendResponse.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format from backend')
    }

    const data = await backendResponse.json()
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON data received')
    }

    return Response.json(data)
  } catch (err) {
    console.error('API route error:', err)
    return Response.json(
      { 
        error: err.message,
        details: 'Failed to process advisory request'
      },
      { status: 500 }
    )
  }
}