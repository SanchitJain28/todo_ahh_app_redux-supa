import React, { use, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  UpdateTodo,
  setIndividualTask,
  removeTodo,
  addNote,
  updateNote,
} from "../features/todoSlice";
import debounce from "lodash.debounce";
export default function AddTodo() {
  //UseDipatch ---->Reducer ko use karte hue -->Store se value huta ta hai ya change krta hai
  const dispatch = useDispatch();
  const myCurrentTask = useSelector((state) => {
    return state.todo.initialTask;
  });
  const user = useSelector((state) => {
    return state.auth.loginDetails.id;
  });
  const [input, setInput] = useState("");
  const addTaskHandler = () => {
    dispatch(
      addNote({
        text: input,
        user_id: user,
      })
    );
    setInput("");
  };
  const handleUpdate = useCallback(
    debounce((note) => {
      console.log("Debounced update:", note);
      // Replace with your dispatch or API call
      dispatch(updateNote(note));
    }, 600),
    [] // Empty dependency array ensures this is created only once
  );

  useEffect(() => {
    addTaskHandler();
    return () => {};
  }, []);

  return (
    <>
      {/* <div className="flex p-4 m-4 border rounded-xl">
                <button onClick={() => {
                    dispatch(removeTodo(myCurrentTask.id))
                    navigate("/")
                }} className='text-white'><i class="fa-solid fa-trash"></i></button>
                <div className="w-4 h-4 mx-1 bg-yellow-400 border lg:w-8 lg:h-8 rounded-xl lg:mx-2" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-yellow-400" }))
                }}></div>
                <div className="w-4 h-4 mx-1 bg-red-400 border lg:w-8 lg:h-8 rounded-xl lg:mx-2" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-red-400" }))
                }}></div>
                <div className="w-4 h-4 mx-1 border lg:w-8 lg:h-8 rounded-xl lg:mx-2 bg-sky-400" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-sky-400" }))
                }}></div>
                <div className="w-4 h-4 mx-1 bg-green-400 border lg:w-8 lg:h-8 rounded-xl lg:mx-2" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "bg-green-400" }))
                }}></div>
                <div className="w-4 h-4 mx-1 bg-black border lg:w-8 lg:h-8 rounded-xl lg:mx-2" onClick={() => {
                    dispatch(changeDesign({ id: myCurrentTask.id, color: "" }))
                }}></div>
            </div> */}
      <div className="m-4 bg-black">
        <textarea
          value={input}
          onChange={(e) => {
            const updatedValue = e.target.value;
            setInput(updatedValue);
            handleUpdate({
              note_id: myCurrentTask.id,
              data: { text: updatedValue },
            });
          }}
          className="w-full min-h-screen p-4 font-sans text-2xl text-white bg-black border rounded-lg  focus:outline-none border-zinc-900"
        ></textarea>
      </div>
    </>
  );
}
