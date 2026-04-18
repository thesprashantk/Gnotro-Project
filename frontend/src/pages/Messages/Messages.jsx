import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Search } from 'lucide-react';
import './Messages.css';

const MOCK_CONTACTS = [
  { id: 'u1', username: 'alice_dev', lastMsg: 'Sure! I can help with that.', time: '2m', unread: 2 },
  { id: 'u2', username: 'techwriter_bob', lastMsg: 'Thanks for the feedback!', time: '1h', unread: 0 },
  { id: 'u3', username: 'priya_ml', lastMsg: 'Did you check the paper I linked?', time: '3h', unread: 1 },
  { id: 'u4', username: 'kiran_web', lastMsg: 'Sounds good 👍', time: '1d', unread: 0 },
];

const MOCK_MESSAGES = {
  u1: [
    { id: 1, sender: 'u1', content: 'Hey! How is the project going?', time: '10:30 AM' },
    { id: 2, sender: 'me', content: 'Going great! Almost done with the frontend.', time: '10:32 AM' },
    { id: 3, sender: 'u1', content: 'Sure! I can help with that.', time: '10:34 AM' },
  ],
  u2: [
    { id: 1, sender: 'u2', content: 'I read your article — amazing work!', time: '9:00 AM' },
    { id: 2, sender: 'me', content: 'Thank you so much!', time: '9:05 AM' },
    { id: 3, sender: 'u2', content: 'Thanks for the feedback!', time: '9:10 AM' },
  ],
};

const Messages = () => {
  const [selected, setSelected] = useState('u1');
  const [chatMessages, setChatMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const imgRef = useRef();
  const bottomRef = useRef();

  const currentContact = MOCK_CONTACTS.find(c => c.id === selected);
  const msgs = chatMessages[selected] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected, chatMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { id: Date.now(), sender: 'me', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => ({ ...prev, [selected]: [...(prev[selected] || []), msg] }));
    setInput('');
  };

  return (
    <div className="messages-page">
      {/* Sidebar: contacts */}
      <div className="contacts-panel">
        <div className="contacts-header">
          <h2>Messages</h2>
          <div className="contact-search">
            <Search size={16} className="contact-search-icon" />
            <input type="text" placeholder="Search people..." className="input contact-search-input" />
          </div>
        </div>
        <div className="contacts-list">
          {MOCK_CONTACTS.map(contact => (
            <button
              key={contact.id}
              className={`contact-item ${selected === contact.id ? 'active' : ''}`}
              onClick={() => setSelected(contact.id)}
            >
              <div className="contact-avatar">
                <span>{contact.username[0].toUpperCase()}</span>
              </div>
              <div className="contact-info">
                <div className="contact-top">
                  <span className="contact-name">@{contact.username}</span>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="contact-bottom">
                  <span className="contact-last-msg">{contact.lastMsg}</span>
                  {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-panel">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="contact-avatar sm">
              <span>{currentContact?.username[0].toUpperCase()}</span>
            </div>
            <span className="chat-name">@{currentContact?.username}</span>
          </div>
        </div>

        <div className="chat-messages">
          {msgs.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.sender === 'me' ? 'outgoing' : 'incoming'}`}>
              <div className="chat-bubble">
                <p>{msg.content}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={sendMessage} className="chat-input-bar">
          <button type="button" className="btn-icon" onClick={() => imgRef.current.click()}>
            <Image size={20} />
          </button>
          <input type="file" ref={imgRef} hidden accept="image/*,video/*" />
          <input
            type="text"
            className="input chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary chat-send" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
