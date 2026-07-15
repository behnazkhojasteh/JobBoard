import React, { useEffect, useState } from 'react'
import type { Job } from '../types'

export default function useJobLoad(url: string) {
  const [jobs, setJob] = useState<Job[]>([])
  const [error, setError] = useState<Error | string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function jobLoad() {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setJob(data.jobs ?? [])
      } catch (e) {
        setError(e instanceof Error ? e : String(e))
      } finally {
        setLoading(false)
      }
    }

    jobLoad()
  }, [url])

  return { jobs, loading, error }
}
