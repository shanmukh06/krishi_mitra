export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const date = searchParams.get('date')

  try {
    const backendResponse = await fetch(
      `http://localhost:8000/advisory?lat=${lat}&lng=${lng}&date=${date}`
    )
    if (!backendResponse.ok) {
      throw new Error(`Backend error: ${backendResponse.status}`)
    }
    const data = await backendResponse.json()
    return Response.json(data)
  } catch (err) {
    console.error('API route error:', err)
    return Response.json(
      { error: err.message },
      { status: 500 }
    )
  }
}