import React, { useState, useEffect } from 'react';
import backgroundImg from '../../images/bballbackground.jpg';
import { fetchNbaTeamData } from '../../api/nbaDataService';

const Dashboard = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768); // Adjust the screen size threshold as needed

  useEffect(() => {
    // Add a resize event listener to update the state when the screen size changes
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Adjust the screen size threshold as needed
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // fetchNbaTeamData()

  }, [])

  return (
    <div className="flex">
      {/* Sidebar (conditionally rendered based on screen size) */}
      {isLargeScreen && (
        <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center hover:text-blue-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                Dashboard Item 1
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center hover:text-blue-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Dashboard Item 2
              </a>
            </li>
            {/* Add more dashboard items here */}
          </ul>
        </div>
      )}

      {/* Content Area */}
      <div
        className={`p-4 ${isLargeScreen ? 'w-full md:w-4/5' : 'w-full'} bg-cover bg-fixed bg-center h-screen overflow-hidden`}
        style={{
          backgroundImage: `url(${backgroundImg})`
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
