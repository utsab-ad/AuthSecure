// src/components/JsFileCounter.jsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaGithub } from 'react-icons/fa';

const GITHUB_USERNAME = "utsab-ad";
const REPO_NAME = "daily-js-by-utsab";
const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/`;
const REPO_LINK = `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`;

const JsFileCounter = () => {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!Array.isArray(data)) {
        setError("Failed to fetch files");
        return;
      }

      const cppFiles = data.filter(
        file => file.type === 'file' && file.name.endsWith('.js')
      );

      setCount(cppFiles.length);
    } catch (err) {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-2 px-3">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center shadow-md transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <h2 className="text-xl font-semibold text-white mb-2">
          🚀 Javascript Raw Practice
        </h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : count === null ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            <CountUp end={count} duration={2} />
          </p>
        )}

        <p className="mt-1 text-gray-300 text-sm">
          Total <b>JS</b> Programs committed in GitHub repo
        </p>

        <a
          href={REPO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-sm font-medium text-blue-400 hover:underline hover:text-blue-700 transition duration-200"
        >
          <FaGithub className="mr-2" />
          View GitHub Repo
        </a>
      </div>
    </div>
  );
};


export default JsFileCounter;
