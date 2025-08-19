import React, { useEffect, useState } from "react";
import { supabase } from "../backend/supabaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { signUp, logIn } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router";
import Alert from "./Alert";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";

export default function Login() {
  const isLogin = useSelector((state) => {
    return state.auth.isLogin;
  });
  const isAlert = useSelector((state) => {
    return state.auth.isAlert;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLogin) {
      navigate("/tasks");
      console.log("hi");
    }
  }, [isLogin]);

  const logMeIn = async () => {
    const data = await dispatch(logIn({ email, password }));
    setEmail("");
    setPassword("");
    console.log(data);
  };
  return (
   <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 1, type: "spring" },
        }}
      >
        <div className="w-full py-6 mb-8 border-b-2 border-orange-500/30">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text">
            Log In
          </h1>
          <div className="w-16 h-1 mt-2 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-green-500 shadow-orange-500/50"></div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium tracking-wide text-orange-400 uppercase">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 text-lg text-white transition-all duration-300 bg-black border-2 border-gray-800 rounded-lg focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20 hover:border-orange-400/50"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium tracking-wide text-orange-400 uppercase">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 pr-12 text-lg text-white transition-all duration-300 bg-black border-2 border-gray-800 rounded-lg focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20 hover:border-orange-400/50"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 transition-colors duration-200 transform -translate-y-1/2 right-3 top-1/2 hover:text-orange-400"
            >
              {showPassword ? (
                <i className="text-lg fa-solid fa-eye-slash"></i>
              ) : (
                <i className="text-lg fa-solid fa-eye"></i>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={logMeIn}
          className="w-full px-6 py-4 mb-6 font-bold tracking-wide text-black uppercase transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 hover:scale-105 shadow-green-500/30 hover:shadow-green-400/50"
        >
          Log In
        </button>

        <div className="text-center">
          <p className="mb-4 text-lg text-gray-400">Not a user?</p>
          <Link href="/signup">
            <button className="px-8 py-3 font-bold tracking-wide text-black uppercase transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 hover:scale-105 shadow-orange-500/30 hover:shadow-orange-400/50">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-20 h-20 rounded-full top-10 right-10 bg-orange-500/10 blur-xl"></div>
          <div className="absolute w-16 h-16 rounded-full bottom-10 left-10 bg-green-500/10 blur-xl"></div>
        </div>
      </motion.div>
    </div>
  );
}
