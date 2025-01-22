import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateTodo, removeTodo, updateNote, deleteNote } from '../features/todoSlice'
import { useNavigate } from 'react-router'
import { animate, AnimatePresence, motion } from "motion/react"
//FOR REDUCING UPDATE REQUESTS
import debounce from 'lodash.debounce';

export default function IndividualTask() {
    const navigate = useNavigate()
    const myCurrentTask = useSelector((state) => { return state.todo.initialTask })
    console.log(myCurrentTask)
    const todos = useSelector((state) => { return state.todo.todos })
    const [input, setInput] = useState(myCurrentTask.text)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            handleUpdate.cancel(); // Cancel any pending debounced calls
        };
    }, []);
    const [color, setColor] = useState(myCurrentTask.style.color)

    //FINALLY THIS SHIT WORKING CORRECTLY,what it does once you stop typing after 600ms it gives a api call,so update requests are less now
    const handleUpdate = useCallback(
        debounce((note) => {
            console.log("Debounced update:", note);
            // Replace with your dispatch or API call
            dispatch(updateNote(note));
        }, 600),
        [] // Empty dependency array ensures this is created only once
    );
    return (
        // GIVE ARBITARY VALUE VALUES LIKE p-["your value in px or differert unit"]
        //FOR SHADOW shadow-[0px_2px_4px_0px_rgba(250,204,21,0.5)]
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }} className={`min-h-screen bg-black p-4 m-0 ${color}`}>
            <div className="border border-zinc-800 rounded-xl p-4 flex justify-between mx-4 shadow-[0px_2px_4px_0px_rgba(250,204,21,0.5)]">
                <button onClick={() => {
                    dispatch(deleteNote({ note_id: myCurrentTask.id }))
                    navigate("/tasks")
                }} className='text-white lg:text-2xl lg:mx-2 mx-1'><i class="fa-solid fa-trash"></i></button>
                <div className="flex justify-center my-2">
                    <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1  rounded-xl lg:mx-2 bg-yellow-400" onClick={() => {
                        setColor("bg-yellow-400 text-black")
                        handleUpdate({ note_id: myCurrentTask.id, data: {
                            style:{
                                color:"bg-yellow-400 text-black"
                            }
                        } })

                    }}></div>
                    <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1  rounded-xl lg:mx-2 bg-red-400" onClick={() => {
                        setColor("bg-red-400 text-black")
                        handleUpdate({ note_id: myCurrentTask.id, data: {
                            style:{
                                color:"bg-red-400 text-black"
                            }
                        } })
                    }}></div>
                    <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1  rounded-xl lg:mx-2 bg-sky-400" onClick={() => {
                        setColor("bg-sky-400 text-black")
                        handleUpdate({ note_id: myCurrentTask.id, data: {
                            style:{
                                color:"bg-sky-400 text-black"
                            }
                        } })
                    }}></div>
                    <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1  rounded-xl lg:mx-2 bg-green-400" onClick={() => {
                        setColor("bg-green-400 text-black")
                        handleUpdate({ note_id: myCurrentTask.id, data: {
                            style:{
                                color:"bg-green-400 text-black"
                            }
                        } })
                    }}></div>
                    <div className="lg:w-8 lg:h-8 w-4 h-4 mx-1 border rounded-xl lg:mx-2 bg-black" onClick={() => {
                        setColor("bg-black text-white")
                        handleUpdate({ note_id: myCurrentTask.id, data: {
                            style:{
                                color:"bg-black text-white"
                            }
                        } })
                    }}></div>
                </div>
            </div>
            <div className=" m-4">
                <textarea value={input} onChange={(e) => {
                    const updatedValue = e.target.value;
                    setInput(updatedValue);
                    handleUpdate({ note_id: myCurrentTask.id, data: { text: updatedValue } })
                }} className={`${color ? color : "bg-black text-white"} shadow-lg shadow-red-600/50 focus:outline-none  text-lg p-4 font-sans border border-zinc-900 rounded-lg w-full min-h-screen`}></textarea>
            </div>
        </motion.div>

    )
}
