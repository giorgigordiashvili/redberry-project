import api from '@/api'
import HomePage from '@/pages/HomePage'
import { DepartmentType, EmployeeType, PriorityType } from '@/types'

export default async function Home() {
  const { data: priorities }: { data: PriorityType[] } = await api.get(
    '/priorities'
  )
  const { data: departments }: { data: DepartmentType[] } = await api.get(
    '/departments'
  )

  const { data: employees }: { data: EmployeeType[] } = await api.get(
    '/employees'
  )

  return (
    <HomePage
      departments={departments}
      priorities={priorities}
      employees={employees}
    />
  )
}
