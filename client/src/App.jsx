import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmite = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessages([
      ...messages,
      {
        body: message,
        from: "Me",
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message");
    };
  }, [messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form className="bg-zinc-900 p-10" onSubmit={handleSubmite}>
      <h1 className="text-3xl font-bold my-2">Chat App</h1>
        <input
          type="text"
          value={message}
          className="border-2 border-zinc-500 p-2 text-black w-full rounded-lg"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 px-5 py-2 m-3 rounded-lg">Send</button>
        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              } p-2 my-2 rounded-xl table`}
            >
              <span>{message.from}</span>: {message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
