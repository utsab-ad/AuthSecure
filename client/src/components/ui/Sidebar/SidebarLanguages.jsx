// components/Sidebar/SidebarLanguages.jsx
import { GrLanguage } from "react-icons/gr";
import { FaJsSquare, FaCode } from "react-icons/fa";

const SidebarLanguages = ({ isOpen }) => (
  <div className={`flex flex-col${isOpen ? "p-4 " : "items-center"}`}>
    <div className="flex gap-4 items-center mb-2">
      <GrLanguage size={24} />
      {isOpen && <span className="font-medium">Languages</span>}
    </div>
    {isOpen && (
      <div className="pl-8 space-y-2">
        <div className="flex justify-between gap-2">
          <FaJsSquare size={20} />
          <span><b>Javascript</b></span>
          <span className="text-green-400 text-sm">Main</span>
        </div>
        <div className="flex justify-between gap-2">
          <FaCode size={20} title="C" />
          <span><b>C</b></span>
          <span className="text-stone-400 text-sm">Foundation</span>
        </div>
        <div className="flex justify-between gap-2">
          <FaCode size={20} title="C++" />
          <span><b>C++</b></span>
          <span className="text-stone-400 text-sm">Foundation</span>
        </div>
      </div>
    )}
  </div>
);

export default SidebarLanguages;
