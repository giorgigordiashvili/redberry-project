import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (!id || isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const user = db.prepare('SELECT avatar FROM employees WHERE id = ?').get(id)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const base64 = user.avatar as string

  if (!base64) {
    return NextResponse.json({ error: 'Avatar not found' }, { status: 404 })
  }

  const match = base64.match(/^data:(.+);base64,(.+)$/)
  if (!match) {
    return NextResponse.json(
      { error: 'Invalid avatar format' },
      { status: 500 }
    )
  }

  const mimeType = match[1]
  const buffer = Buffer.from(match[2], 'base64')

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mimeType,
      'Content-Length': buffer.length.toString(),
      'Cache-Control': 'public, max-age=31536000'
    }
  })
}
