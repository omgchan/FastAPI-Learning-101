import React, { useState, useEffect } from 'react'

export default function TodoForm({ onCreate, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (editing) setTitle(editing.title || '')
  }, [editing])

  const submit = (e) => {
    e.preventDefault()
    const payload = { title }
    if (editing) onUpdate(editing.id, payload)
    else onCreate(payload)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">{editing ? 'Update' : 'Create'}</button>
      {editing && (
        <button type="button" onClick={onCancel} className="muted">
          Cancel
        </button>
      )}
    </form>
  )
}
