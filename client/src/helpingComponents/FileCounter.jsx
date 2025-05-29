import React from "react";
import CppFileCount from "./CppFileCount";
import JsFileCounter from "./JsFileCounter";

const FileCounter = () => {
  return (
    <div>
      <h3 className="font-bold text-indigo-700 dark:text-white text-xl text-center">You can check out how i am solving the problems</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div>
          <div>
            <CppFileCount />
          </div>
        </div>
        <div>
            <JsFileCounter/>
        </div>
      </div>
    </div>
  );
};

export default FileCounter;
