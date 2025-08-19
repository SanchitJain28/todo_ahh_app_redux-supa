import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { removeTodo,UpdateTodo } from '../features/todoSlice'
export default function UpdateTodoComponent() {
    const [input,setInput]=useState("")
  return (
    <div>
        <input value={input} onChange={(e)=>{
            setInput(e.target.value)
        }} className='p-4 my-4 text-lg text-white bg-black border rounded border-grey-600'></input>
        <button className='p-4 text-xl text-white rounded bg-sky-600'>Update</button>
    </div>
  )
}
