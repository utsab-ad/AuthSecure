import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // <-- loading state
  const chatEndRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setLoading(true); // <-- start loading

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/test/chatbot`,
        { message },
        { withCredentials: true }
      );
      setChatHistory((prev) => [
        ...prev,
        { sender: "agent", text: res.data.message },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "agent", text: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false); // <-- stop loading
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy.");
    }
  };

  const renderAgentMessage = (text) => {
    const parts = text.split(/```/g);
    return parts.map((part, i) => {
      const isCode = i % 2 !== 0;
      return isCode ? (
        <div key={i} className="relative my-2">
          <SyntaxHighlighter language="javascript" style={oneDark}>
            {part}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(part)}
            className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-600"
          >
            Copy
          </button>
        </div>
      ) : (
        <div key={i}>
          <p className="whitespace-pre-line">{part}</p>
          {part.trim() && (
            <button
              onClick={() => copyToClipboard(part)}
              className="mt-1 text-xs text-blue-600 hover:underline"
            >
              Copy Text
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg shadow-md ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="font-semibold mb-1">
                {chat.sender === "user" ? "You" : "Agent"}
              </p>
              {chat.sender === "agent" ? (
                <div className="space-y-2">{renderAgentMessage(chat.text)}</div>
              ) : (
                <p>{chat.text}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2 rounded-lg shadow-md bg-white text-gray-800 animate-pulse">
              <p className="font-semibold mb-1">Agent</p>
              <p>Thinking...</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 flex items-center gap-2 md:mb-0 mb-6"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
          disabled={loading} // optional: disable button while loading
        >
          Send
        </button>
      </form>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`fixed ml-2 mt-2 pl-2 pt-2 left-0 hover:text-stone-600 top-0 cursor-pointer`}
      >
        <IoMdArrowRoundBack />
      </button>
    </div>
  );
};

export default Chatbot;
