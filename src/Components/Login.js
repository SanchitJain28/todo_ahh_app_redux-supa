import React, { useEffect, useState } from 'react'
import { supabase } from '../backend/supabaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, logIn } from '../features/authSlice'
import { NavLink, useNavigate } from 'react-router';
import Alert from './Alert';
import { AnimatePresence, motion } from 'motion/react';


export default function Login() {
  const isLogin = useSelector((state) => { return state.auth.isLogin })
  const isAlert = useSelector((state) => { return state.auth.isAlert })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isLogin) {
      navigate('/tasks')
      console.log("hi")
    }
  }, [isLogin])

  const logMeIn = async () => {
    const data = await dispatch(logIn({ email, password }))
    setEmail("")
    setPassword("")
    console.log(data)
  }
  return (
    <motion.div className='flex overflow-hidden flex-col justify-center content-center align-center m-auto mx-12' initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 1, type: "spring" } }}>
      {/* //HEADING */}
      <div className="border-zinc-700 w-full border-b-2 py-4 mb-8"><p className='text-2xl text-zinc-400 pb-4 '>Log in </p></div>

      {/* //EMAIL */}
      <div className="email">
        <p className='text-sm text-zinc-500  my-2'>email</p>
        <input onChange={(e) => {
          setEmail(e.target.value)
        }} value={email} className='bg-black w-[320px] lg:w-[550px] focus:outline-none p-2 text-white text-lg  border border-zinc-700 rounded-lg mb-2'></input>
      </div>

      {/* //PASSWORD */}
      <div className="password">
        <p className='text-sm text-zinc-500  mb-2'>password</p>
        <div className="flex border border-zinc-700 lg:w-[550px] w-[320px] rounded-lg p-[1.6px]">
          <input type={showPassword?"":"password"} onChange={(e) => {
                setPassword(e.target.value)
              }} value={password} className='bg-black w-[320px] lg:w-[500px] focus:outline-none p-2 text-white text-lg '></input>
          <button className=' p-2 mx-2 text-white' onClick={() => {
            showPassword ? setShowPassword(false) : setShowPassword(true)
          }}>{showPassword ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}</button>
        </div>

      </div>

      <div id="loginButton">
        <button onClick={logMeIn} className='p-4 lg:p-4 w-40  my-4 text-sm font-mono text-black shadow-lg shadow-green-800 bg-green-600 rounded'>log In</button>
      </div>


      {/* //not a user */}
      <div id="notauser">
        <p className='text-lg text-zinc-400 font-sans '>Not a user?</p>
        <NavLink to="/signup">
          <button className='p-4 lg:p-4 my-4 font-mono text-black shadow-lg shadow-cyan-800/50 bg-blue-600 rounded'>Sign up</button>
        </NavLink>
      </div>

    </motion.div>
  )
}
