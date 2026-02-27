import React, { useState, useEffect } from 'react';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Simulate receiving messages from a server
        const interval = setInterval(() => {
            const newMessage = { text: `New message at ${new Date().toLocaleTimeString()}`, id: Date.now() };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue) {
            const newMessage = { text: inputValue, id: Date.now() };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputValue('');
        }
    };

    return (
        <div>
            <h1>Chat Application</h1>
            <div>
                {messages.map(message => (
                    <div key={message.id}>{message.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatApp;