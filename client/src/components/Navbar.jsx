import React, { useContext } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { IoMenu } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import {toast} from "react-hot-toast";
const Navbar = ({ isDark, setIsDark, toggle, isOpen }) => {
  const navigate = useNavigate();
 const {user,setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logout Successfull")
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "";

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 shadow px-4 py-3 border-b">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => toggle(!isOpen)}
          className="md:hidden text-gray-600 dark:text-white self-end"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <MdClose size={22} /> : <IoMenu size={22} />}
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="text-gray-600 dark:text-white select-none"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-yellow-400"
              >
                <FaSun size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-indigo-500"
              >
                <FaMoon size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <h1 className="text-xl hidden md:block font-bold text-teal-700 dark:text-white">Note-Dashboard</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex justify-center items-center rounded-full p-3 w-8 h-8 bg-gray-900 text-white dark:bg-white dark:text-black">
            <h2>{getInitial(user.name)}</h2>
          </div>
        )}
        <div onClick={handleLogout}>
          <IoLogOutOutline size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
