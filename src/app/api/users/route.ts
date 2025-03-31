import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET: return all employees
export async function GET() {
  const stmt = db.prepare(`
    SELECT e.*, d.name AS department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
  `)
  const employees = stmt.all()
  return NextResponse.json(employees)
}

function getAvatarUrl(id: number) {
  return `/api/users/avatar?id=${id}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name')?.toString().trim()
    const surname = formData.get('surname')?.toString().trim()
    const departmentIdRaw = formData.get('department_id')?.toString()
    const department_id = Number(departmentIdRaw)

    const avatarFile = formData.get('avatar') as File | null

    const errors: Record<string, string> = {}

    if (!name) errors.name = 'Name is required'
    if (!surname) errors.surname = 'Surname is required'
    if (!departmentIdRaw || isNaN(department_id)) {
      errors.department_id = 'Valid department ID is required'
    } else {
      const dep = db
        .prepare('SELECT id FROM departments WHERE id = ?')
        .get(department_id)
      if (!dep) {
        errors.department_id = 'Department does not exist'
      }
    }
    console.log(avatarFile)
    if (!avatarFile) {
      errors.avatar = 'Avatar file is required'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Read avatar as base64
    const buffer = Buffer.from(await avatarFile.arrayBuffer())
    const base64 = `data:${avatarFile.type};base64,${buffer.toString('base64')}`

    // Insert into DB
    const stmt = db.prepare(`
      INSERT INTO employees (name, surname, avatar, department_id)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(name, surname, base64, department_id)
    const id = Number(result.lastInsertRowid)

    const newEmployee = {
      id,
      name,
      surname,
      avatar_url: getAvatarUrl(id),
      department_id
    }

    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    console.error('POST /api/users failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
