import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmite = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessages([...messages, {
      body: message,
      from: 'Me'
    }]);
    setMessage('');
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    }
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message');
    }
  },[messages]);

  return (
    <div className='App'>
      <h1>Chat Socket</h1>
      <form onSubmit={handleSubmite}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>
      {
        messages.map((message, index) => (
          <div key={index}>
            <strong>{message.from}</strong>: {message.body}
          </div>
        ))
      }
    </div>
  )
}

export default App
