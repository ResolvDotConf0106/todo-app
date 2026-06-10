import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const addTodo = async () => {
    if (!text.trim()) return
    const res = await fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
    setText('')
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>🐳 Docker Todo App</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', fontSize: '16px' }}>
          Add
        </button>
      </div>
      {todos.map(todo => (
        <div key={todo.id} style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
          {todo.text}
        </div>
      ))}
    </div>
  )
}

export default App
