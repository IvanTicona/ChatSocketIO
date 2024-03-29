import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('');

  const handleSubmite = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      console.log(message)
    }
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message');
    }
  },[]);

  return (
    <div className='App'>
      <h1>Chat Socket</h1>
      <form onSubmit={handleSubmite}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default App
