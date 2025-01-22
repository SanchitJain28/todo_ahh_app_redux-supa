import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIndividualTask, changeViewMode, fetchNotes } from '../features/todoSlice'

import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react"
import { supabase } from '../backend/supabaseConfig';
import Alert from './Alert';
import { logOut } from '../features/authSlice';

export default function Tasks() {
    const user = useSelector((state) => { return state.auth.loginDetails.id })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNotes({
            user_id: user
        }))
    }, [])
    const navigate = useNavigate()
    const todos = useSelector((state) => { return state.todo.todos });
    const supaTasks=useSelector((state)=>{return state.todo.supaTasks})
    const viewMode = useSelector((state) => { return state.todo.viewMode })
    //WE CAN ALSO WRITE,both works same
    // const todosAlternativeSyntax = useSelector(state=>state.todoReducer.todos);
    return (
        <>
        {console.log(supaTasks)}
            {/* SEXY CHIZ OPACITY CONTROL IN TAILWINDCSS BY /"your opacity" for example bg-red-800/40 ==>40% opacity */}
            {/* DAMN IT WAS EASY */}
            {/* exit animations only work if there is Animate presence component and 
            there should be key for the every children of parent */}
            <div className="border-b-[1px] shadow-lg shadow-yellow-700/40 border-zinc-800 py-4 flex">
                <motion.button onClick={() => {
                    viewMode.name == "column mode" ? dispatch(changeViewMode({ name: "grid mode", class: "grid lg:grid-cols-3  grid-cols-2" })) : dispatch(changeViewMode({ name: "column mode", class: "flex flex-col" }))
                }} whileHover={{ scale: 1.2 }} className='text-black text-sm mx-2 shadow-lg shadow-green-700/50 hover:shadow-xl hover:shadow-green-800 p-4  rounded-lg border-zinc-800 bg-green-600'>{viewMode.name}</motion.button>
                <motion.button onClick={() => {
                    dispatch(logOut())
                }} className='text-black text-sm mx-2  hover:shadow-xl hover:shadow-cyan-800 p-2 text-white border  rounded-lg border-zinc-800 '>
                    Logout
                </motion.button>
                <motion.button onClick={() => {
                    navigate("/about")
                }} className='text-black text-sm mx-2  hover:shadow-xl hover:shadow-cyan-800 p-2 text-white border  rounded-lg border-zinc-800 '>
                    about us
                </motion.button>
                {/* <p className='text-zinc-500 text-sm font-sans'>{loginDetails.email}</p> */}
            </div>
            <motion.div whileHover={{ scale: 1.3, transition: { duration: 0.1 } }} onClick={() => [
                navigate("/addtask")
            ]} className='bg-cyan-500 p-8 fixed bottom-10 lg:p-8 lg:mx-12 mx-8 shadow-lg shadow-cyan-500/50 rounded-full z-10' initial={{ x: -window.innerWidth }} animate={{ x: 0, transition: { duration: 0.3, type: 'spring', ease: ["easeIn", "easeOut"] } }}>
                <i className="fa-solid fa-plus rounded-full text-3xl"></i>
            </motion.div>


            <AnimatePresence>
                {todos.length !== 0 ? <>
                    <div className={`${viewMode.class} p-4`}>
                        {supaTasks.map((e, index) => {
                            return <>
                                {/* FOR MOBILE */}
                                <motion.div whileHover={{ scaleY: 1.2, scaleX: 1.01, transition: { duration: 0.1 } }} onClick={() => { dispatch(setIndividualTask(e)); navigate("/currentTask") }} initial={{ x: window.innerWidth, opacity: 0, scale: 0 }} animate={{ scale: 1, x: 0, opacity: 1, transition: { type: "", duration: 1, ease: "easeOut" } }} key={index} exit={{ opacity: 0, transition: { duration: 0.4 } }} className={` ${e.style.color || "text-white"}  overflow-hidden  p-4 my-2 lg:mx-4 mx-1 border border-zinc-800 rounded lg:hidden shadow-lg shadow-cyan-500/30`}>
                                    <p className='lg:text-xl text-sm overflow-hidden lg:mx-2 font-sans '>{e.text.length > 200 ? <p>{e.text.slice(0, 200)}...<span className='text-green-600 font-bold underline'>Read more</span></p> : e.text}</p>
                                </motion.div>
                                {/* FOR PC */}
                                <motion.div variants={{
                                    column: { scale: 1, x: 0, opacity: 1, transition: { type: "", duration: 1, ease: "easeOut" } },
                                    grid: { scale: 1, x: 0, opacity: 1, transition: { type: "", duration: 1, ease: "easeOut" } }
                                }} whileHover={{ scaleY: 1.1, scaleX: 1.01, transition: { duration: 0.1 } }} onClick={() => { dispatch(setIndividualTask(e)); navigate("/currentTask") }} initial={{ x: window.innerWidth, opacity: 0, scale: 0 }} animate={viewMode.name == "column mode" ? "column" : "grid"} key={index + 1} exit={{ opacity: 0, transition: { duration: 0.4 } }} className={`	 ${e.style.color || "text-white"}  p-4 my-2 lg:mx-4 lg:my-4 mx-4 border border-zinc-800 rounded lg:block hidden shadow-lg shadow-cyan-500/30`}>
                                    <p className='lg:text-xl text-sm overflow-hidden lg:mx-2 font-sans '>{e.text.length > 400 ? <p>{e.text.slice(0, 400)}...<span className='text-green-600 font-bold underline'>Read more</span></p> : e.text}</p>
                                </motion.div>
                            </>
                        })}
                    </div>

                </> : <>
                    <div className="flex justify-center border border-zinc-800 p-4  content-center rounded" onClick={() => {
                        navigate("/addtask")
                    }}>
                        <p className='lg:text-3xl text-lg font-sans text-center text-white text-zinc-600'>Create a new task</p>
                    </div>
                </>}
            </AnimatePresence>

        </>

    )
}
