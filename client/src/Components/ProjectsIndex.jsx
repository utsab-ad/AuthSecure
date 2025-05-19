import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import blog from "/blog.png"

const ProjectIndex = () => {
  return (
 <div className="px-2 md:px-6 lg:px-8 mt-8 space-y-4">
      <h3 className="text-2xl font-bold text-center text-indigo-700 mb-2">Project</h3>

      <section className="relative w-full rounded-xl shadow-lg bg-white border border-gray-200 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 items-center"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl shadow-md group relative"
            >
              <img
                src={blog}
                alt="Blog App Project"
                className="w-full h-64 sm:h-72 md:h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-end items-end p-4">
                <a
                  href="/projects/blog-app"
                  className="text-white text-xs font-semibold flex items-center gap-1 hover:underline"
                >
                  Explore <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </motion.div>

            {/* Description */}
            <div className="text-sm text-gray-800 space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600">
                MERN Blog App
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A full-stack blog app built with the MERN stack. Auth, role-based access, content management—everything you need to run a blog.
              </p>

              {/* Contributor */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src="https://github.com/shadcn.png"
                  alt="Utsab Adhikari"
                  className="w-9 h-9 rounded-full border border-indigo-300"
                />
                <div>
                  <p className="font-medium text-sm">Utsab Adhikari</p>
                  <p className="text-xs text-gray-500">Lead Developer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="flex justify-end">
        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
          All Projects →
        </p>
      </div>
    </div>
  );
};

export default ProjectIndex;
