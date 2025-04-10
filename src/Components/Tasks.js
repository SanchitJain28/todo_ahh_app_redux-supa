import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIndividualTask, changeViewMode } from "../features/todoSlice";

import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { logOut } from "../features/authSlice";
import { supabase } from "../backend/supabaseConfig";

export default function Tasks() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loginDetails.id);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user", user)
        .order("created_at", { ascending: false });
      setTasks(data);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const viewMode = useSelector((state) => {
    return state.todo.viewMode;
  });
  //WE CAN ALSO WRITE,both works same
  // const todosAlternativeSyntax = useSelector(state=>state.todoReducer.todos);
  return (
    <>
      {/* SEXY CHIZ OPACITY CONTROL IN TAILWINDCSS BY /"your opacity" for example bg-red-800/40 ==>40% opacity */}
      {/* DAMN IT WAS EASY */}
      {/* exit animations only work if there is Animate presence component and 
            there should be key for the every children of parent */}
      <div className="border-b-[1px] shadow-lg shadow-yellow-700/40 border-zinc-800 py-4 flex">
        <motion.button
          onClick={() => {
            viewMode.name == "column mode"
              ? dispatch(
                  changeViewMode({
                    name: "grid mode",
                    class: "grid lg:grid-cols-3  grid-cols-2",
                  })
                )
              : dispatch(
                  changeViewMode({
                    name: "column mode",
                    class: "flex flex-col",
                  })
                );
          }}
          whileHover={{ scale: 1.2 }}
          className="p-4 mx-2 text-sm text-black bg-green-600 rounded-lg shadow-lg shadow-green-700/50 hover:shadow-xl hover:shadow-green-800 border-zinc-800"
        >
          {viewMode.name}
        </motion.button>
        <motion.button
          onClick={() => {
            dispatch(logOut());
          }}
          className="p-2 mx-2 text-sm text-black text-white border rounded-lg hover:shadow-xl hover:shadow-cyan-800 border-zinc-800 "
        >
          Logout
        </motion.button>
        <motion.button
          onClick={() => {
            navigate("/about");
          }}
          className="p-2 mx-2 text-sm text-black text-white border rounded-lg hover:shadow-xl hover:shadow-cyan-800 border-zinc-800 "
        >
          about us
        </motion.button>
        {/* <p className='font-sans text-sm text-zinc-500'>{loginDetails.email}</p> */}
      </div>
      <motion.div
        whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}
        onClick={() => [navigate("/addtask")]}
        className="fixed z-10 p-8 mx-8 rounded-full shadow-lg bg-cyan-500 bottom-10 lg:p-8 lg:mx-12 shadow-cyan-500/50"
        initial={{ x: -window.innerWidth }}
        animate={{
          x: 0,
          transition: {
            duration: 0.3,
            type: "spring",
            ease: ["easeIn", "easeOut"],
          },
        }}
      >
        <i className="text-3xl rounded-full fa-solid fa-plus"></i>
      </motion.div>

      <AnimatePresence>
        {tasks.length !== 0 ? (
          <>
            <motion.div
              initial={{ x: window.innerWidth, opacity: 0, scale: 0 }}
              animate={{
                scale: 1,
                x: 0,
                opacity: 1,
                transition: { type: "", duration: 0.6, ease: "easeOut" },
              }}
              className={`${viewMode.class} p-4`}
            >
              {tasks.map((e, index) => {
                return (
                  <>
                    <motion.div
                                  key={index}

                      whileHover={{
                        scaleY: 1.2,
                        scaleX: 1.01,
                        transition: { duration: 0.1 },
                      }}
                      onClick={() => {
                        dispatch(setIndividualTask(e));
                        navigate(`/currentTask?id=${e.id}`);
                      }}
                      className={` ${
                        e.style.color || "text-white"
                      }  overflow-hidden  p-4 my-2 lg:mx-4 mx-1 border border-zinc-800 rounded shadow-lg shadow-cyan-500/30`}
                    >
                      <p className="overflow-hidden font-sans text-sm lg:text-xl lg:mx-2 ">
                        {e.text.length > 200 ? (
                          <span>
                            {e.text.slice(0, 200)}...
                            <span className="font-bold text-green-600 underline">
                              Read more
                            </span>
                          </span>
                        ) : (
                          e.text
                        )}
                      </p>
                    </motion.div>
                  </>
                );
              })}
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex content-center justify-center p-4 border rounded border-zinc-800">
              <Link
                to="/addtask"
                className="font-sans text-lg text-center text-white lg:text-3xl text-zinc-600"
              >
                Create a new task
              </Link>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
