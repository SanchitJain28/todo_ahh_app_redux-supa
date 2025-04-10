import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ id, style, text }) {
  const navigate = useNavigate();
  const dragTimeout = useRef(null);
  const isDraggingEnabled = useRef(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // 🟢 gives true when dragging
  } = useSortable({ id });

  const sortStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 1,
  };

  const handlePointerDown = (e) => {
    dragTimeout.current = setTimeout(() => {
      isDraggingEnabled.current = true;
      listeners.onPointerDown(e);
    }, 100); // hold 500ms
  };

  const handlePointerUp = () => {
    clearTimeout(dragTimeout.current);
    if (!isDraggingEnabled.current) {
      navigate(`/currentTask?id=${id}`);
    }
    isDraggingEnabled.current = false;
  };

  const handlePointerMove = () => {
    clearTimeout(dragTimeout.current);
  };

  return (
    <div
      ref={setNodeRef}
      style={sortStyle}
      className={`${
        style.color || "text-white"
      } overflow-hidden p-4 my-2 lg:mx-4 mx-1 rounded shadow-lg shadow-cyan-500/30 flex justify-between items-center 
      ${isDragging ? "border-4 border-yellow-400" : "border border-zinc-800"}`}
      whileHover={{
        scaleY: 1.05,
        scaleX: 1.01,
        transition: { duration: 0.1 },
      }}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
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
    </div>
  );
}
