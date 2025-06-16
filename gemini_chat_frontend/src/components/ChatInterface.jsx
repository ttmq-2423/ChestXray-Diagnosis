import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css'; // Tạo file CSS này để style

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/chat';
// src/components/ChatInterface.jsx
const API_BASE_URL = import.meta.env.VITE_API_URL || '/GeminiChat/api'; // Sẽ là '/api' khi build trong Docker
const API_URL = `${API_BASE_URL}/chat`; // Ví dụ: /api/chat

function ChatInterface() {
    const [messages, setMessages] = useState([
        // { role: 'model', parts: ["Chào bạn! Tôi có thể giúp gì cho bạn?"] } // Tin nhắn chào mừng ban đầu (nếu muốn)
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); // Để tự động cuộn xuống tin nhắn mới nhất

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]); // Cuộn xuống mỗi khi messages thay đổi

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = { role: 'user', parts: [newMessage.trim()] };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setNewMessage('');
        setIsLoading(true);

        try {
            // Xây dựng lịch sử chat cho API backend
            // API Gemini yêu cầu "user" và "model" roles
            const historyForAPI = updatedMessages.slice(0, -1).map(msg => ({
                role: msg.role,
                // API Gemini cần 'parts' là một array, kể cả khi chỉ có một text part.
                // Đảm bảo service backend cũng xử lý 'parts' như một list.
                parts: Array.isArray(msg.parts) ? msg.parts : [String(msg.parts)]
            }));


            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.parts[0], // Gửi text của tin nhắn mới nhất
                    history: historyForAPI
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { role: 'model', parts: [data.reply] };
            setMessages(prevMessages => [...prevMessages, aiMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { role: 'model', parts: [`Lỗi: ${error.message}`] };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Gemini Chat 🤖</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-sender">
                            {msg.role === 'user' ? 'Bạn' : 'Gemini'}
                        </div>
                        {/* Hiển thị nội dung, giả sử parts là array và phần tử đầu tiên là text */}
                        <div className="message-content">
                             {Array.isArray(msg.parts) ? msg.parts.join(" ") : msg.parts}
                        </div>
                    </div>
                ))}
                {isLoading && <div className="message model typing">Gemini đang trả lời...</div>}
                <div ref={messagesEndRef} /> {/* Anchor để cuộn */}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Nhập tin nhắn của bạn..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang gửi...' : 'Gửi'}
                </button>
            </form> {/* <<<< SỬA THÀNH </form> */}
        </div>
    );
}

export default ChatInterface;