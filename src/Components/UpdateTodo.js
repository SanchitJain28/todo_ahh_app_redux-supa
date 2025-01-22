import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { removeTodo,UpdateTodo } from '../features/todoSlice'
export default function UpdateTodo() {
    const [input,setInput]=useState("")
  return (
    <div>
        <input value={input} onChange={(e)=>{
            setInput(e.target.value)
        }} className='p-4 border border-grey-600 rounded my-4 bg-black text-white text-lg'></input>
        <button className='bg-sky-600 text-white text-xl rounded p-4'>Update</button>
    </div>
  )
}
