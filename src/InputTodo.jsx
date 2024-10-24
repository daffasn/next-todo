import { useEffect, useState } from 'react'

const InputTodo = ({id, text, isDone, completedTodo, deleteTodo, handleTextChange}) => {

  const [currentText, setCurrentText] = useState(text)

  const handleInputChange = (e) => {
    setCurrentText(e.target.value)
    handleTextChange(id, e.target.value)
  };

  const delHandle = () => {
    deleteTodo(id)
  }

  useEffect(() => {
    setCurrentText(text)
  }, [text])
  

  console.log(currentText)

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', border: '2px solid black', padding: '10px', borderRadius: '5px', justifyContent: 'space-between'}}>
          <input type="checkbox" onChange={() => completedTodo(id)} checked={isDone} />
          <input type="text" className='todo-input' value={currentText} onChange={handleInputChange} style={{textDecoration: isDone ? 'line-through' : ''}} readOnly={isDone}  />
          <button onClick={delHandle}>X</button>
        </div>
    </div>
  )
}

export default InputTodo
