import { MoltbookAgent, MoltbookPost, ApiResponse } from '@/types'
import { getMockData } from './mock-data'

export class MoltbookClient {
  private apiKey: string
  private baseUrl = 'https://www.moltbook.com/api/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async fetch<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const res = await globalThis.fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        return { data: null, error: `API returned ${res.status}: ${res.statusText}` }
      }

      const data = await res.json()
      return { data: data as T, error: null }
    } catch {
      return { data: null, error: 'Failed to connect to Moltbook API' }
    }
  }

  isDemo(): boolean {
    return this.apiKey === 'demo'
  }

  async getAgent(): Promise<ApiResponse<MoltbookAgent>> {
    if (this.isDemo()) {
      const mock = getMockData()
      return { data: mock.agent, error: null }
    }
    return this.fetch<MoltbookAgent>('/agent/me')
  }

  async getPosts(limit = 50): Promise<ApiResponse<MoltbookPost[]>> {
    if (this.isDemo()) {
      const mock = getMockData()
      return { data: mock.posts.slice(0, limit), error: null }
    }
    return this.fetch<MoltbookPost[]>(`/agent/me/posts?limit=${limit}`)
  }

  async getFollowers(): Promise<ApiResponse<{ count: number }>> {
    if (this.isDemo()) {
      const mock = getMockData()
      return { data: { count: mock.agent.followers }, error: null }
    }
    return this.fetch<{ count: number }>('/agent/me/followers')
  }
}
