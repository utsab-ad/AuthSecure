import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaTools } from 'react-icons/fa';

const Languages = () => {
  return (
    <div className="bg-[#111827] p-6 rounded-lg shadow-md">
     <h3 className="text-2xl font-extrabold text-indigo-600 text-center md:text-right mb-1">
  Behind the Build 
</h3>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center"
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-300 to-blue-200 animate-pulse shadow-lg border-4 border-blue-300 flex items-center justify-center">
            <FaCode className="text-5xl text-indigo-700" />
          </div>
        </motion.div>

        <div className="text-gray-300 space-y-3 text-sm md:text-base">
          <p>
            <span className="font-semibold text-indigo-600">Main Language:</span> JavaScript (Fullstack with MERN)
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Foundations:</span> C Programming, OOP with C++
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Web Technologies:</span> React, Node.js, Express, MongoDB
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Styling:</span> Tailwind CSS, Bootstrap
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Tools & Security:</span> SQL Injection basics, Wireshark fundamentals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Languages;
