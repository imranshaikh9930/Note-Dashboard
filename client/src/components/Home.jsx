import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';

const Home = () => {
    const {user } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
  <h1 className="text-3xl md:text-4xl font-semibold mb-4">
    Welcome back, <span className="text-teal-600">{user.name}</span>!
  </h1>
  <p className="text-gray-600 dark:text-gray-300 max-w-md md:text-justify md:text-lg">
    We're glad to have you here. Explore your dashboard, manage your notes, and customize your settings to stay organized and productive.
  </p>
</div>

  
  )
}

export default Home