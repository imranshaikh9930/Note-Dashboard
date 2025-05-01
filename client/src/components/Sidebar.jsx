import { motion } from "framer-motion";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { MdSpeakerNotes } from "react-icons/md";

import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-2 py-1 rounded-md transition-colors ${
      isActive
        ? "text-teal-600 font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
    }`;

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed z-50 top-0 left-0 h-full w-[220px] bg-white dark:bg-gray-800 shadow-md p-4 overflow-y-auto flex flex-col md:hidden"
      >
        <div className="flex justify-between items-center">

           <h1 className="text-md block md:hidden font-bold text-teal-700 dark:text-white">Note-Dashboard</h1>

        <button
          onClick={toggle}
          className=" text-gray-600 dark:text-white self-end"
        >
          <MdClose size={24} />
        </button>
        </div>
     
        <ul className="space-y-6 mt-8">
          <li>
            <NavLink to="/dashboard/home" className={linkClasses}>
              <IoMdHome size={22} />
              <span>Home</span>
            </NavLink>
          </li>
       
          <li>
            <NavLink to="/dashboard/notes" className={linkClasses}>
              <MdSpeakerNotes size={22} />
              <span>Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/about" className={linkClasses }>
              <FcAbout size={22} />
              <span>About</span>
            </NavLink>
          </li>
         
        </ul>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[220px] bg-white dark:bg-gray-800 shadow-md h-screen p-4">
    
        <ul className="space-y-6">
          <li>
            <NavLink to="/dashboard/home" className={linkClasses}>
              <IoMdHome size={22} />
              <span>Home</span>
            </NavLink>
          </li>
       
          <li>
            <NavLink to="/dashboard/notes" className={linkClasses}>
              <MdSpeakerNotes size={22} />
              <span>Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/about" className={linkClasses }>
              <FcAbout size={22} />
              <span>About</span>
            </NavLink>
          </li>
         
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
