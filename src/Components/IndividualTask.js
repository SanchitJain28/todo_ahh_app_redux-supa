import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
//FOR REDUCING UPDATE REQUESTS
import { motion } from "motion/react";
import { supabase } from "../backend/supabaseConfig";
import { useDebounce } from "@uidotdev/usehooks";
export default function IndividualTask() {
  const [style, setStyle] = useState("");
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 500);
  const FetchTask = async () => {
    setLoading(true);
    try {
      const {
        data: { text, style },
        error,
      } = await supabase
        .from("notes")
        .select("*")
        .eq("id", searchParams.get("id"))
        .single();
      setInput(text);
      setStyle(style.color);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async () => {
    try {
      const data = await supabase
        .from("notes")
        .delete()
        .eq("id", searchParams.get("id"));
      if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async () => {
    try {
      const data = await supabase
        .from("notes")
        .update({ text: input })
        .eq("id", searchParams.get("id"));
      if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStyle = async (style) => {
    try {
      const data = await supabase
        .from("notes")
        .update({ style: { color: style } })
        .eq("id", searchParams.get("id"));
      if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchTask();
  }, []);
  useEffect(() => {
    if (debouncedValue) updateTask();
  }, [debouncedValue]);
  const styles = [
    { style: "bg-yellow-400 text-black" },
    { style: "bg-red-400 text-black" },
    { style: "bg-sky-400 text-black" },
    { style: "bg-green-400 text-black" },
    { style: "bg-sky-400 text-black" },
    { style: "bg-black text-white" },
  ];
  if (loading) {
    return (
      <div>
        <p className="text-2xl text-white">Loading</p>
      </div>
    );
  }
  return (
    // GIVE ARBITARY VALUE VALUES LIKE p-["your value in px or differert unit"]
    //FOR SHADOW shadow-[0px_2px_4px_0px_rgba(250,204,21,0.5)]
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className={`min-h-screen bg-black p-4 m-0 ${style}`}
    >
      <div className="border border-zinc-800 rounded-xl p-4 flex justify-between mx-4 shadow-[0px_2px_4px_0px_rgba(250,204,21,0.5)]">
        <button
          onClick={async () => {
            await deleteTask();
            navigate("/tasks");
          }}
          className="mx-1 text-white lg:text-2xl lg:mx-2"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
        <div className="flex justify-center my-2">
          {styles.map((e, index) => {
            return (
              <div
                key={index}
                className={`w-4 h-4 mx-1 ${e.style} lg:w-8 lg:h-8 rounded-xl lg:mx-2`}
                onClick={async () => {
                  setStyle(e.style);
                  await updateStyle(e.style);
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="m-4 ">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`${
            style ? style : "bg-black text-white"
          } shadow-lg shadow-red-600/50 focus:outline-none  text-lg p-4 font-sans border border-zinc-900 rounded-lg w-full min-h-screen`}
        ></textarea>
      </div>
    </motion.div>
  );
}
