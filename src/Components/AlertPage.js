import React from 'react'
import { NavLink } from 'react-router'

export default function AlertPage() {
    return (
        <div>
            <p className='text-xl text-zinc-400 font-sans text-center p-12'>Please login or signup to run this app</p>
            <div className="flex justify-center">
                <NavLink to="/login">
                    <button className='p-4 lg:p-8 my-4 mx-2 font-mono text-black shadow-lg shadow-green-800 bg-green-600 rounded'>Log in</button>
                </NavLink>
                <NavLink to="/signup">
                    <button className='p-4 lg:p-8 my-4 mx-2 font-mono text-black shadow-lg shadow-green-800 bg-blue-600 rounded'>Sign Up</button>
                </NavLink>
            </div>
        </div>
    )
}
