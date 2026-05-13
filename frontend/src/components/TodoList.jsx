import React from 'react'

export default function TodoList({ items = [], onEdit, onDelete }) {
  if (!items.length) return <p>No todos yet.</p>

  return (
    <ul className="todo-list">
      {items.map((it) => (
        <li key={it.id} className="todo-item">
          <span>{it.title}</span>
          <div className="actions">
            <button onClick={() => onEdit(it)}>Edit</button>
            <button onClick={() => onDelete(it.id)} className="danger">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
