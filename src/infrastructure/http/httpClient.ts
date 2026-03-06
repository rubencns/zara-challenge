const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
}

export const httpClient = {
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_URL}${path}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
    }
    const response = await fetch(url.toString(), { headers: defaultHeaders })
    if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText || response.url}`)
    return response.json()
  },
}
