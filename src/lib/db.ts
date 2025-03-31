import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

// Ensure the 'data' folder exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

// Connect to or create the SQLite database file
const dbPath = path.join(dataDir, 'database.sqlite')
const db = new Database(dbPath)

// Initialize table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    avatar TEXT,
    department_id INTEGER NOT NULL
  )
`)

// Create departments table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

// Seed departments if empty
const count = db
  .prepare('SELECT COUNT(*) as total FROM departments')
  .get().total
if (count === 0) {
  const departments = [
    { id: 1, name: 'ადმინისტრაციის დეპარტამენტი' },
    { id: 2, name: 'ადამიანური რესურსების დეპარტამენტი' },
    { id: 3, name: 'ფინანსების დეპარტამენტი' },
    { id: 4, name: 'გაყიდვები და მარკეტინგის დეპარტამენტი' },
    { id: 5, name: 'ლოჯოსტიკის დეპარტამენტი' },
    { id: 6, name: 'ტექნოლოგიების დეპარტამენტი' },
    { id: 7, name: 'მედიის დეპარტამენტი' },
    { id: 8, name: 'დიზაინერების დეპარტამენტი' }
  ]

  const insert = db.prepare('INSERT INTO departments (id, name) VALUES (?, ?)')
  const insertMany = db.transaction((deps) => {
    for (const dep of deps) insert.run(dep.id, dep.name)
  })
  insertMany(departments)
}

export default db
