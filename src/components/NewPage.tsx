'use client'

import { useEffect, useState } from 'react'

type Employee = {
  id: number
  name: string
  surname: string
  avatar: string
  department_id: number
}

function NewPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://momentum.redberryinternship.ge/api/employees',
          {
            headers: {
              Authorization: 'Bearer 9e85a26b-aa4b-46dd-8935-5d71e2ed0803'
            }
          }
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setEmployees(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.avatar && (
              <img
                src={emp.avatar}
                alt={`${emp.name} ${emp.surname}`}
                width={50}
                height={50}
              />
            )}
            {emp.name} {emp.surname} (Dept ID: {emp.department_id})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewPage
