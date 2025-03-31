'use client'

import { EmployeeType } from '@/types'
import { useEffect, useState } from 'react'

type Task = {
  id: number
  name: string
  description: string
  due_date: string
  status: {
    id: number
    name: string
  }
  priority: {
    id: number
    name: string
    icon: string
  }
  department: {
    id: number
    name: string
  }
  employee: EmployeeType
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          'https://momentum.redberryinternship.ge/api/tasks',
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
        setTasks(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) return <div>Loading tasks...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Task List</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold">{task.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <p className="text-sm">Due: {task.due_date}</p>
          <p className="text-sm">Status: {task.status.name}</p>
          <p className="text-sm">Priority: {task.priority.name}</p>
          <p className="text-sm">Department: {task.department.name}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm">Assigned to:</span>
            {task.employee.avatar ? (
              <img
                src={task.employee.avatar}
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
            )}
            <span className="text-sm">
              {task.employee.name} {task.employee.surname}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TasksPage
