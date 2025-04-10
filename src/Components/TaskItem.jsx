import { motion } from "framer-motion"; // ✅ changed from motion/react to framer-motion
import React from "react";
import { useNavigate } from "react-router";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ id, style, text }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const sortStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={sortStyle}
      className={`${
        style.color || "text-white"
      } overflow-hidden p-4 my-2 lg:mx-4 mx-1 border border-zinc-800 rounded shadow-lg shadow-cyan-500/30 flex justify-between items-center`}
      whileHover={{
        scaleY: 1.05,
        scaleX: 1.01,
        transition: { duration: 0.1 },
      }}
      onClick={() => navigate(`/currentTask?id=${id}`)}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <p className="w-full overflow-hidden font-sans text-sm lg:text-xl lg:mx-2">
        {text.length > 200 ? (
          <span>
            {text.slice(0, 200)}...
            <span className="ml-2 font-bold text-green-600 underline">
              Read more
            </span>
          </span>
        ) : (
          text
        )}
      </p>

      {/* ✅ Drag Handle */}
      <span
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()} // prevent interfering with card click
        className="ml-2 cursor-grab text-zinc-400 hover:text-white"
        title="Drag to reorder"
      >
        <i className="text-xl fa-solid fa-grip-lines-vertical"></i>
      </span>
    </div>
  );
}
