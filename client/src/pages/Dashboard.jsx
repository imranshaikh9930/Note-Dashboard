import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { AuthContext } from '../Context/AuthContext';


const Dashboard = () => {
 const {isDark,setIsDark } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar isDark={isDark} setIsDark={setIsDark} isOpen={isOpen} toggle={toggle} />

      <div className="relative flex">
        <Sidebar isOpen={isOpen} toggle={toggle} />

        {isOpen && (
          <div
            onClick={toggle}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}

        <div
          className={`flex-1 min-h-screen p-4 transition-all duration-300 
          ${isOpen ? 'blur-sm pointer-events-none md:blur-0 md:pointer-events-auto' : ''}`}
        >
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
