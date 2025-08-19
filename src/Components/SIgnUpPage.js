import React, { useEffect, useState } from "react";
import { supabase } from "../backend/supabaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router";
import Alert from "./Alert";
import { AnimatePresence, motion } from "motion/react";

export default function SignUpPage() {
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

  const SignMeUp = async () => {
    const data = await dispatch(signUp({ email, password }));
    setEmail("");
    setPassword("");
    console.log(data);
  };
  return (
    <>
      <motion.div
        className="overflow-hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 1, type: "spring" },
        }}
      >
        <div className="w-full border-b-2 border-zinc-700 ">
          <p className="pt-4 pb-4 mx-12 text-2xl text-zinc-400">Sign Up </p>
        </div>
        <div
          className="flex flex-col px-12 py-8 lg:px-20 lg:pt-20 "
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { duration: 1, type: "spring" },
          }}
        >
          {/* EMAIL PART */}
          <div id="email">
            <p className="my-2 text-sm text-zinc-500">email</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="bg-black lg:w-[550px] w-[320px] focus:outline-none p-2 text-white text-lg  border border-zinc-700 rounded-lg mb-2"
            ></input>
          </div>
          {/* PASSWORD PART */}
          <div id="password">
            <p className="mb-2 text-sm text-zinc-500">password</p>
            <div className="flex border border-zinc-700  lg:w-[550px] w-[320px] rounded-lg p-[1.6px]">
              <input
                type={showPassword ? "" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="bg-black w-[320px] lg:w-[500px] focus:outline-none p-2 text-white text-lg"
              ></input>
              <button
                className="p-2 mx-2 text-white "
                onClick={() => {
                  showPassword ? setShowPassword(false) : setShowPassword(true);
                }}
              >
                {showPassword ? (
                  <i class="fa-solid fa-eye-slash"></i>
                ) : (
                  <i class="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
          </div>
          {/* //ACTION PART */}
          <button
            onClick={SignMeUp}
            className="p-2 lg:p-4  my-4 w-[100px] lg:w-[200px] font-sans font-bold text-black shadow-lg shadow-green-800 bg-green-600 rounded"
          >
            SIGN UP
          </button>
          {/* //ALREADY A USER PART */}
          <div id="alreadyauser ">
            <p className="text-xl text-zinc-500">Already a user ?</p>
            <NavLink to="/login">
              <button className="p-2 lg:p-4  my-4 w-[100px] lg:w-[200px] font-sans font-bold text-black shadow-lg shadow-green-800 bg-blue-600 rounded">
                Log in
              </button>
            </NavLink>
          </div>
        </div>
      </motion.div>
    </>
  );
}
