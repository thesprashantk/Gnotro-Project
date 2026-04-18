import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Trash2 } from 'lucide-react';
import './AI.css';

const MOCK_RESPONSES = [
  "That's a great question! Based on current research, the most effective approach involves carefully balancing model capacity with training data quality.",
  "I understand what you're asking. Let me break this down step by step for clarity.",
  "Interesting perspective! The field has been evolving rapidly. Here's what the latest findings suggest...",
  "Great topic for research. I can help you explore multiple angles on this subject.",
  "From a technical standpoint, there are several important considerations to keep in mind here.",
];

const GnotroAI = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m Gnotro AI. Ask me anything — research questions, writing help, or just explore ideas together.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([{ id: 1, role: 'assistant', content: 'Hello! I\'m Gnotro AI. Ask me anything — research questions, writing help, or just explore ideas together.' }]);
  };

  return (
    <div className="ai-page">
      <div className="ai-header">
        <div className="ai-title-row">
          <div className="ai-logo"><Cpu size={22} /><span>Gnotro AI</span></div>
          <button className="btn-icon" onClick={clearChat} title="Clear chat"><Trash2 size={18} /></button>
        </div>
        <p className="ai-subtitle">Your AI research & writing assistant</p>
      </div>

      <div className="messages-window">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="ai-avatar"><Cpu size={16} /></div>
            )}
            <div className="message-bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="ai-avatar"><Cpu size={16} /></div>
            <div className="message-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="ai-input-bar">
        <input
          type="text"
          className="input ai-input"
          placeholder="Ask Gnotro AI anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ai-send" disabled={loading || !input.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default GnotroAI;
