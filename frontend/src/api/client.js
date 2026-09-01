const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const pingGemini = async () => {
  const response = await fetch(`${API_BASE_URL}/api/ping-gemini`)
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }
  return response.json()
}
