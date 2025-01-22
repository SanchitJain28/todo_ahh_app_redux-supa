import React from 'react'
import { NavLink } from 'react-router'

export default function
    () {
    return (
        <div>
            <p className='text-3xl text-zinc-700 text-center font-sans p-12'>Home page </p>
            <p className='text-lg text-zinc-500  px-12'> The To-Do App is a simple yet powerful application that helps users manage their daily tasks efficiently. It leverages Redux for state management, Supabase for backend services (authentication, database, and APIs), and React for a dynamic and interactive user interface.</p>
            <NavLink to="/signup">
                <button className='p-4 lg:p-8 mx-12 my-4 font-mono text-black shadow-lg shadow-green-800 bg-green-600 rounded'>SIGN UP</button>
            </NavLink>
            <NavLink to="/login">
                <button className='p-4 lg:p-8 mx-12 my-4 font-mono text-white shadow-lg shadow-blue-800 bg-blue-600 rounded'>Log in</button>
            </NavLink>
        </div>
    )
}
