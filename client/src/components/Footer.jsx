import React from 'react'

const Footer = () => {
  return (
    <footer className="col-span-full md:col-start-2 bg-white dark:bg-gray-900 border-t text-sm text-gray-600 dark:text-gray-300 p-4 text-center dark:border-gray-700">
    © {new Date().getFullYear()} Your Company Name. All rights reserved.
  </footer>
  
  )
}

export default Footer