import { useEffect, useRef, useState } from 'react'
import './Todo.css'
import InputTodo from './InputTodo'

const Todo = () => {

  const [inputHandler, setInputHandler] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])
  
  const createInput = useRef()

  const setTodo = () => {
    const setText = createInput.current.value.trim()

    if (setText) {
      const newArr = {
        id: Date.now(),
        text: setText,
        isDone: false
      }

      setInputHandler([...inputHandler, newArr])
    }

    createInput.current.value = ''

  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (createInput.current.value.trim()) {
        setTodo()
      }
    }
  }

  const handleTextChange = (id, newText) => {
    setInputHandler((todos) => {
      return todos.map((item) => {
        if (item.id === id) {
          return {...item, text: newText}
        }
        return item
      })
    })
  }


  const completedTodo = (id) => {
    setInputHandler((todos) => {
      return todos.map((item) => {
        if (item.id === id) {
          return {...item, isDone: !item.isDone}
        }
        return item
      })
    })
  }

  const deleteTodo = (id) => {
    setInputHandler((todos) => {
      return todos.filter((item) => item.id !== id)
    })
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(inputHandler))
  }, [inputHandler])

  console.log(inputHandler)


  return (
    <div>
      <div style={{display:'flex', flexDirection: 'column', gap: '10px'}}>

        <div style={{display: 'flex', alignItems: 'center', border: '2px solid black', padding: '10px', borderRadius: '5px'}}>
          <input type="text" ref={createInput} className='todo-input' placeholder='Create a new todo' onKeyDown={handleKeyPress} />
          <button onClick={setTodo}>Submit</button>
        </div>

        <div style={inputHandler.length > 4 ? {height: '300px', overflowY: 'scroll'} : {}}>
          {inputHandler.map((item, index) => 
            <InputTodo key={index} id={item.id} text={item.text} isDone={item.isDone} completedTodo={completedTodo} deleteTodo={deleteTodo} handleTextChange={handleTextChange} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo
