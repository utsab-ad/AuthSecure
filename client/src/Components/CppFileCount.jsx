// src/components/CppFileCount.jsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaGithub } from 'react-icons/fa';

const GITHUB_USERNAME = "utsab-ad";
const REPO_NAME = "OOP-with-CPP";
const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/`;
const REPO_LINK = `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`;

const CppFileCount = () => {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

const fetchFiles = async () => {
  const visited = new Set();

  const countCppFiles = async (url) => {
    let count = 0;
    if (visited.has(url)) return 0;
    visited.add(url);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data)) return 0;

      for (const item of data) {
        if (item.type === 'file' && item.name.endsWith('.cpp')) {
          count++;
        } else if (item.type === 'dir') {
          count += await countCppFiles(item.url); // Recurse into subfolder
        }
      }

      return count;
    } catch {
      return 0;
    }
  };

  try {
    const totalCount = await countCppFiles(API_URL);
    setCount(totalCount);
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
          🚀 C++ Programs Practice
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
          Total <b>C++</b> Problems committed in GitHub repo
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

//JsFileCounter

export default CppFileCount;
