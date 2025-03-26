'use client'

import { StatusType } from '@/types'
import { useEffect, useState } from 'react'

type Props = {
  serverStatuses: StatusType[]
}

function Statuses({ serverStatuses }: Props) {
  const [statuses, setStatuses] = useState<StatusType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://momentum.redberryinternship.ge/api/statuses'
        )
        const data: StatusType[] = await res.json()
        setStatuses(data)
      } catch (error) {
        console.error('Failed to fetch statuses:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <div>
      {statuses.map((status, index) => (
        <>
          client
          <div key={index.toString()}>{status.name}</div>
        </>
      ))}

      {serverStatuses.map((status, index) => (
        <div key={index.toString()}>{status.name}</div>
      ))}
    </div>
  )
}

export default Statuses
