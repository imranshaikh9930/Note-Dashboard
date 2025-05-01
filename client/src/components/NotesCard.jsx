import React from "react";
import { motion } from "framer-motion";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { scale: 1.03 },
};

const NotesCard = ({ note, handleEdit, handleDelete }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="min-w-[250px] px-3 max-w-[250px] flex-shrink-0 flex flex-col bg-white dark:bg-neutral-900 
        border border-gray-200 dark:border-neutral-700 rounded-xl 
        shadow-md hover:shadow-lg transition-all duration-300 mx-auto"
    >
      <div className="p-4 md:p-5 ">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Note
        </h3>
        <p className="text-sm text-gray-600 dark:text-neutral-300 break-words">
          {note.content}
        </p>
        <small className="text-sm text-gray-600 dark:text-neutral-300 break-words font-semibold">
        Last updated:{" "}
  {new Date(note.updatedAt || note.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
        </small>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handleEdit(note)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 text-sm font-medium"
          >
            <FaPencil className="w-4 h-4 inline mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(note._id)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 text-sm font-medium"
          >
            <FaTrashAlt className="w-4 h-4 inline mr-1" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesCard;
