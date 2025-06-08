import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

import { Button } from "@/components/ui/button";
import { IoSend } from "react-icons/io5";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setLoading(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch {
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
    <div className="flex flex-col min-h-screen text-gray-800 dark:text-white">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-80px)]">
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
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white animate-pulse">
              <p className="font-semibold mb-1">Agent</p>
              <p>Thinking...</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="w-full px-4 py-3 sticky bottom-0">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            send
            <IoSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
