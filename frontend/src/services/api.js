const BASE = 'http://localhost:8000/todos'

export async function getTodos() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export async function createTodo(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create todo')
  return res.json()
}

export async function updateTodo(id, payload) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete todo')
  return true
}

export default { getTodos, createTodo, updateTodo, deleteTodo }
