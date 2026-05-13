import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import * as api from './services/api'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      const data = await api.getTodos()
      setTodos(data || [])
    } catch (err) {
      console.error(err)
      setTodos([])
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(payload) {
    try {
      const created = await api.createTodo(payload)
      setTodos((s) => [created, ...s])
    } catch (err) {
      console.error(err)
    }
  }

  async function handleUpdate(id, payload) {
    try {
      const updated = await api.updateTodo(id, payload)
      setTodos((s) => s.map((t) => (t.id === id ? updated : t)))
      setEditing(null)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return
    try {
      await api.deleteTodo(id)
      setTodos((s) => s.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Header />

      <section className="panel">
        <TodoForm
          onCreate={handleCreate}
          editing={editing}
          onUpdate={handleUpdate}
          onCancel={() => setEditing(null)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList items={todos} onEdit={(it) => setEditing(it)} onDelete={handleDelete} />
        )}
      </section>
    </div>
  )
}

export default App
