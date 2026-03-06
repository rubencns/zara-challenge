import { describe, it, expect, vi, beforeEach } from 'vitest'
import { httpClient } from './httpClient'

const mockFetch = vi.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe('httpClient', () => {
  describe('get', () => {
    it('should call fetch with the correct URL and default headers', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: 'test' }),
      })

      await httpClient.get('/products')

      expect(mockFetch).toHaveBeenCalledOnce()
      const [url, options] = mockFetch.mock.calls[0]
      expect(url).toContain('/products')
      expect(options.headers).toEqual(
        expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      )
    })

    it('should append query params to the URL', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      })

      await httpClient.get('/products', { search: 'iphone', limit: '10' })

      const [url] = mockFetch.mock.calls[0]
      const parsed = new URL(url)
      expect(parsed.searchParams.get('search')).toBe('iphone')
      expect(parsed.searchParams.get('limit')).toBe('10')
    })

    it('should return parsed JSON on success', async () => {
      const mockData = [{ id: '1', name: 'Phone' }]
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const result = await httpClient.get<typeof mockData>('/products')

      expect(result).toEqual(mockData)
    })

    it('should throw an error when the response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(httpClient.get('/products/invalid')).rejects.toThrow('HTTP error 404: Not Found')
    })

    it('should work without params', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      })

      await httpClient.get('/products/1')

      const [url] = mockFetch.mock.calls[0]
      expect(url).toContain('/products/1')
    })

    it('should include x-api-key header', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      })

      await httpClient.get('/products')

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers).toHaveProperty('x-api-key')
    })
  })
})
