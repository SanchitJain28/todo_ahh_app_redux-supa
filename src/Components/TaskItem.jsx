import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ id, style, text }) {
  const navigate = useNavigate();
  const clickTimer = useRef(null);
  const [isDragStarted, setIsDragStarted] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    // Enhanced animation configuration
    animateLayoutChanges: () => true, // Always animate layout changes
    transition: {
      duration: 250, // Smoother transition duration
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const sortStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms cubic-bezier(0.25, 1, 0.5, 1)', // Fallback transition
    zIndex: isDragging ? 999 : 1,
    // Add these styles for better mobile behavior
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent',
  };

  // Handle click/tap for navigation
  const handleClick = () => {
    // Only navigate if we're not in the middle of dragging
    if (!isDragging && !isDragStarted) {
      navigate(`/currentTask?id=${id}`);
    }
  };

  // Handle drag start
  const handleDragStart = () => {
    setIsDragStarted(true);
  };

  // Handle drag end
  const handleDragEnd = () => {
    // Small delay to prevent click after drag
    setTimeout(() => {
      setIsDragStarted(false);
    }, 100);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={sortStyle}
      className={`${
        style?.color || "text-white"
      } overflow-hidden p-4 my-2 lg:mx-4 mx-1 rounded shadow-lg shadow-cyan-500/30 
      cursor-pointer relative
      ${isDragging ? "border-4 border-yellow-400 opacity-60" : "border border-zinc-800"}
      transition-all duration-200 ease-out`}
      whileHover={{
        scaleY: isDragging ? 1 : 1.02,
        scaleX: isDragging ? 1 : 1.01,
        transition: { duration: 0.15 },
      }}
      layout="position" // Only animate position changes, not size
      layoutId={`task-${id}`} // Unique layout ID for better animations
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isDragging ? 0.6 : 1, 
        scale: isDragging ? 1.03 : 1,
        transition: { duration: 0.2 }
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // Apply drag listeners and attributes
      {...attributes}
      {...listeners}
    >
      {/* Main content */}
      <div className="flex items-center justify-between">
        <p className="w-full overflow-hidden font-sans text-sm pointer-events-none lg:text-xl lg:mx-2">
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
        
        {/* Visual drag indicator - optional */}
        <div className="hidden ml-4 opacity-50 pointer-events-none sm:block">
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Dragging overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-yellow-400 rounded pointer-events-none bg-opacity-10" />
      )}
    </motion.div>
  );
}