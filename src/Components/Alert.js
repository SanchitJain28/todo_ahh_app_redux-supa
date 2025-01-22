import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../features/authSlice'
import { AnimatePresence, motion } from "motion/react"


export default function Alert() {
  const dispatch = useDispatch()
  const alertMessageByAuth = useSelector((state) => { return state.auth.AlertMessage })
  const alertStyleByAuth = useSelector((state) => { return state.auth.AlertStyle })
  const ISALERTBYAUTH = useSelector((state) => { return state.auth.isAlert })
  const ISALERTBYLIST = useSelector((state) => { return state.todo.isAlert })
  const alertMessageByList = useSelector((state) => { return state.todo.AlertMessage })


  const [enable, setEnable] = useState(false)
  //NOW THIS IS GOOD CODE FOR A SETTIMEOUT
  useEffect(() => {
    let timer;
    if (ISALERTBYAUTH) {
      setEnable(true)
      timer = setTimeout(() => {
        setEnable(false)
        dispatch(hideAlert())
      }, 2000)
    }
    else {
      setEnable(false)
    }
    // Cleanup timer on component unmount or before the next effect runs
    return () => clearTimeout(timer)
  }, [ISALERTBYAUTH,dispatch])

  return (
    <>
      <AnimatePresence>
        {enable && <motion.div initial={{ scale: 0, x: window.innerWidth }} exit={{ x: -window.innerWidth, scale: 0 }} animate={{ scale: 1, x: 0, transition: { duration: 1, type: "spring" } }} className={`shadow-lg shadow-cyan-600/70 p-4 overflow-hidden bg-blue-600 rounded-lg m-2 fixed bottom-10 right-5`}>
          <p className='text-lg text-white font-sans  z-20'>{alertMessageByAuth}</p>
        </motion.div>}
      </AnimatePresence>
    </>

  )
}
