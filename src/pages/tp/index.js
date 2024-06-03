import React from 'react';

const CompetitionsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Curio</h1>
      </header>

      <nav className="bg-gray-200 py-2 px-6 flex space-x-6 text-gray-600">
        <a href="#" className="hover:text-gray-800">Competitions</a>
        <a href="#" className="hover:text-gray-800">Scholarships</a>
        <a href="#" className="hover:text-gray-800">MUNs</a>
        <a href="#" className="hover:text-gray-800">Youth Events</a>
        <a href="#" className="hover:text-gray-800">Fests</a>
        <a href="#" className="hover:text-gray-800">Mentorship</a>
        <a href="#" className="hover:text-gray-800">Workshops</a>
        <a href="#" className="text-blue-500 font-bold">Host</a>
        <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</a>
      </nav>

      <div className="grid grid-cols-4 gap-6 p-6">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <img src="bright-light-education.jpg" alt="Bright Light Education" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">Online Creative Writing Competition 2024 for Children</h3>
            <p className="text-gray-600">February 28, 2024</p>
            <div className="mt-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Free</span>
              <span className="text-blue-500 ml-2">Writing</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <img src="international-day-of-sign-languages-quiz.jpg" alt="International Day of Sign Languages Quiz" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">International Day of Sign Languages Quiz 2023 by Government</h3>
            <p className="text-gray-600">December 2, 2023</p>
            <div className="mt-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Free</span>
              <span className="text-blue-500 ml-2">Quiz</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <img src="climate-science-olympiad.jpg" alt="Climate Science Olympiad" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">Climate Science Olympiad 2024 (CSO 2024) by Climate Science</h3>
            <p className="text-gray-600">May 20, 2024</p>
            <div className="mt-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Free</span>
              <span className="text-blue-500 ml-2">Olympiad</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <img src="heritage-quiz.jpg" alt="Heritage Quiz" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">MyGov Free National Heritage Cultural Quiz 2023 for Students</h3>
            <p className="text-gray-600">May 31, 2024</p>
            <div className="mt-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Free</span>
              <span className="text-blue-500 ml-2">Quiz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;