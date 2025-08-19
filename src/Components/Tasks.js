import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIndividualTask, changeViewMode } from "../features/todoSlice";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { logOut } from "../features/authSlice";
import { supabase } from "../backend/supabaseConfig";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

export default function Tasks() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Require 10px movement before activating drag
        delay: 150,   // 150ms delay helps distinguish tap from drag on mobile
        tolerance: 8, // Higher tolerance for mobile touch precision
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }
  
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loginDetails.id);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const fetchNotes = async () => {
    console.log("TRIGGERED");
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user", user)
        .order("created_at", { ascending: false }); // Then by creation date
      
      console.log(data, error);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // If no position field exists, assign positions based on current order
      const tasksWithPosition = data.map((task, index) => ({
        ...task,
        position: task.position ?? index
      }));
      
      setTasks(tasksWithPosition);
      return tasksWithPosition;
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const viewMode = useSelector((state) => {
    return state.todo.viewMode;
  });

  // Update task positions in database
  // const updateTaskPositions = async (reorderedTasks) => {
  //   try {
  //     // Create array of updates with new positions
  //     const updates = reorderedTasks.map((task, index) => ({
  //       id: task.id,
  //       position: index
  //     }));

  //     // Update each task's position in the database
  //     const updatePromises = updates.map(({ id, position }) =>
  //       supabase
  //         .from("notes")
  //         .update({ position })
  //         .eq("id", id)
  //         .eq("user", user)
  //     );

  //     const results = await Promise.all(updatePromises);
      
  //     // Check for errors
  //     const errors = results.filter(result => result.error);
  //     if (errors.length > 0) {
  //       console.error("Errors updating positions:", errors);
  //       // Revert to original order if there were errors
  //       fetchNotes();
  //     }
  //   } catch (error) {
  //     console.error("Error updating task positions:", error);
  //     // Revert to original order on error
  //     fetchNotes();
  //   }
  // };

  async function handleDragEnd(event) {
    const { active, over } = event;
    
    setActiveId(null); // Clear active drag state

    if (!over) return;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        if (oldIndex === -1 || newIndex === -1) {
          console.error("Could not find task indices");
          return items;
        }
        
        console.log("Moving from index", oldIndex, "to", newIndex);
        const reorderedTasks = arrayMove(items, oldIndex, newIndex);
        
        // Update positions in database with slight delay for smoother animation
        setTimeout(() => {
          // updateTaskPositions(reorderedTasks);
        }, 300);
        
        return reorderedTasks;
      });
    }
  }

  // Handle drag cancel
  function handleDragCancel() {
    setActiveId(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading tasks...</div>
      </div>
    );
  }

  if (!tasks) {
    return null;
  }

  return (
    <>
      {/* Header with buttons */}
      <div className="border-b-[1px] shadow-lg shadow-yellow-700/40 border-zinc-800 py-4 flex">
        <motion.button
          onClick={() => {
            viewMode.name == "column mode"
              ? dispatch(
                  changeViewMode({
                    name: "grid mode",
                    class: "grid lg:grid-cols-3 grid-cols-2",
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
          className="p-2 mx-2 text-sm text-white border rounded-lg hover:shadow-xl hover:shadow-cyan-800 border-zinc-800"
        >
          Logout
        </motion.button>
        <motion.button
          onClick={() => {
            navigate("/about");
          }}
          className="p-2 mx-2 text-sm text-white border rounded-lg hover:shadow-xl hover:shadow-cyan-800 border-zinc-800"
        >
          about us
        </motion.button>
      </div>

      {/* Add task button */}
      <motion.div
        whileHover={{ scale: 1.3, transition: { duration: 0.1 } }}
        onClick={() => [navigate("/addtask")]}
        className="fixed z-10 p-8 mx-8 rounded-full shadow-lg cursor-pointer bg-cyan-500 bottom-10 lg:p-8 lg:mx-12 shadow-cyan-500/50"
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

      {tasks.length !== 0 ? (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <motion.div
              initial={{ x: window.innerWidth, opacity: 0, scale: 0 }}
              animate={{
                scale: 1,
                x: 0,
                opacity: 1,
                transition: { type: "spring", duration: 0.5, ease: "easeOut" },
              }}
              className={`${viewMode.class} p-4 gap-4`} // Added gap for better spacing
              style={{
                touchAction: 'none', // Prevent browser's default touch behavior
                userSelect: 'none',  // Prevent text selection on mobile
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            >
              <SortableContext
                items={tasks.map((task) => task.id)} // ✅ IDs only
                strategy={rectSortingStrategy}
              >
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    style={task.style}
                    text={task.text}
                  />
                ))}
              </SortableContext>
            </motion.div>
            
            {/* DragOverlay for smoother dragging experience */}
            <DragOverlay>
              {activeId ? (
                <div className="transform shadow-2xl opacity-90 rotate-6">
                  <TaskItem
                    id={activeId}
                    style={tasks.find(task => task.id === activeId)?.style}
                    text={tasks.find(task => task.id === activeId)?.text}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
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
    </>
  );
}