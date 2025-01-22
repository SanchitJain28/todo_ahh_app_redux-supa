import React, { use, useCallback, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addTodo,  UpdateTodo,setIndividualTask,removeTodo,addNote, updateNote } from '../features/todoSlice'
import debounce from 'lodash.debounce'
export default function AddTodo() {
    //UseDipatch ---->Reducer ko use karte hue -->Store se value huta ta hai ya change krta hai
    const dispatch = useDispatch()
    const myCurrentTask=useSelector((state)=>{return state.todo.initialTask})
    const user=useSelector((state)=>{return state.auth.loginDetails.id})
    const [input, setInput] = useState("")
    const addTaskHandler = () => {
        dispatch(addNote({
            text: input,
            user_id:user
        }))
        setInput("")
    }
     const handleUpdate = useCallback(
            debounce((note) => {
                console.log("Debounced update:", note);
                // Replace with your dispatch or API call
                dispatch(updateNote(note));
            }, 600),
            [] // Empty dependency array ensures this is created only once
        );
 
    useEffect(() => {
        addTaskHandler()
        return ()=>{
        }
    }, [])
    
    return (
        <>
            {/* <div className="border rounded-xl p-4 flex m-4">
                <button onClick={() => {
                    dispatch(removeTodo(myCurrentTask.id))
                    navigate("/")
                }} className='text-white'><i class="fa-solid fa-trash"></i></button>
                <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-yellow-400" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-yellow-400" }))
                }}></div>
                <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-red-400" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-red-400" }))
                }}></div>
                <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-sky-400" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-sky-400" }))
                }}></div>
                <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-green-400" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-green-400" }))
                }}></div>
                <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-black" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "" }))
                }}></div>
            </div> */}
            <div className="bg-black m-4">
                <textarea value={input} onChange={(e) => {
                    const updatedValue = e.target.value;
                    setInput(updatedValue);
                    handleUpdate({ note_id: myCurrentTask.id, text: updatedValue })
                }} className=' focus:outline-none text-white text-2xl p-4 font-sans bg-black border border-zinc-900 rounded-lg w-full min-h-screen'></textarea>
            </div>
        </>
    )
}
