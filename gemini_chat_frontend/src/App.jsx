import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css'; // Có thể xóa nếu không dùng CSS global ở App.css

function App() {
  return (
    <div className="App">
      <ChatInterface />
    </div>
  );
}

export default App;