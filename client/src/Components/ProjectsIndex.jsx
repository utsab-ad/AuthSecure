import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import blog from "/blog.png"

const ProjectIndex = () => {
  return (
    <div> <h3 className="font-bold text-indigo-700 dark:text-white text-2xl text-center mb-4">
    Project
  </h3>
<section className="relative w-full py-16 px-4 bg-gradient-to-br from-blue-100 to-indigo-200 border-1 border-black dark:border-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-950 text-gray-800 dark:text-white rounded-xl shadow-lg overflow-hidden transition-colors duration-500 ">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Image with Hover Zoom */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={blog}
              alt="Blog App Project"
              className="w-full h-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
              <a
                href="/projects/blog-app"
                className="text-white text-sm font-semibold flex items-center gap-2 hover:underline"
              >
                Explore Full Details <FaExternalLinkAlt />
              </a>
            </div>
          </motion.div>

          {/* Description */}
          <div className="space-y-4 text-gray-800">
            <h2 className="text-3xl font-bold text-indigo-600">MERN Blog App</h2>
            <p className="text-base leading-relaxed dark:text-white">
              A full-stack blog platform built with the MERN stack, featuring secure authentication, route protection, and role-based access control (Admin & Blogger).
              Public users can browse posts, while registered users can write and manage content.
            </p>

            {/* Contributor */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src="https://github.com/shadcn.png"
                alt="Utsab Adhikari"
                className="w-10 h-10 rounded-full border border-indigo-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-white">Utsab Adhikari</p>
                <p className="text-xs text-gray-500">Lead Developer</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    <div className='flex justify-end items-center w-full cursor-pointer'>
        <p className='text-sm w-fit p-2 text-blue-600 hover:underline text-right'>All Projects →</p>
    </div>
    </div>
  );
};

export default ProjectIndex;
