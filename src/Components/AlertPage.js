import React from "react";
import { NavLink } from "react-router";

export default function AlertPage() {
  return (
    <div>
      <p className="p-12 font-sans text-xl text-center text-zinc-400">
        Please login or signup to run this app
      </p>
      <div className="flex justify-center">
        <NavLink to="/login">
          <button className="p-4 mx-2 my-4 font-mono text-black bg-green-600 rounded shadow-lg lg:p-8 shadow-green-800">
            Log in
          </button>
        </NavLink>
        <NavLink to="/signup">
          <button className="p-4 mx-2 my-4 font-mono text-black bg-blue-600 rounded shadow-lg lg:p-8 shadow-green-800">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
}
