import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getBotResponse } from '../../api/chatbot';

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual. Pregúntame cualquier duda sobre cómo funciona la aplicación.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Definir estilos según el tema
  const isDark = theme === 'dark';
  // Fondo igual que el de la app: bg-gray-900 (#18181b)
  const chatBg = isDark ? '#18181b' : '#fff';
  const chatText = isDark ? '#e5e7eb' : '#222';
  const chatHeaderBg = '#2563eb';
  const chatHeaderText = '#fff';
  const chatShadow = '0 4px 24px rgba(0,0,0,0.15)';

  // Estado para hover
  const [hover, setHover] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const botMsg = { from: 'bot', text: getBotResponse(userMsg.text) };
      setMessages((msgs) => [...msgs, botMsg]);
      setLoading(false);
    }, 900 + Math.random() * 800); // Simula entre 0.9 y 1.7s de "pensando"
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1000 }}>
      <div
        style={{
          width: 320,
          height: open ? 400 : 0,
          opacity: open ? 1 : 0,
          background: chatBg,
          color: chatText,
          borderRadius: 12,
          boxShadow: chatShadow,
          marginBottom: 12,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <div style={{ background: chatHeaderBg, color: chatHeaderText, padding: 12, fontWeight: 'bold', minHeight: 44 }}>
          Chatbot
          <button onClick={() => setOpen(false)} style={{ float: 'right', background: 'none', border: 'none', color: chatHeaderText, fontSize: 18, cursor: 'pointer' }}>&times;</button>
        </div>
        <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? (isDark ? '#2563eb' : '#2563eb') : (isDark ? '#23272f' : '#f3f4f6'),
              color: msg.from === 'user' ? '#fff' : (isDark ? '#e5e7eb' : '#222'),
              borderRadius: 16,
              padding: '8px 14px',
              maxWidth: '80%',
              fontSize: 15,
            }}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', color: isDark ? '#a1a1aa' : '#888', fontStyle: 'italic', fontSize: 15 }}>
              El bot está escribiendo...
            </div>
          )}
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', borderTop: isDark ? '1px solid #23272f' : '1px solid #e5e7eb', background: chatBg }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: chatText,
              padding: 12,
              fontSize: 15,
            }}
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" style={{ background: 'none', border: 'none', color: chatHeaderBg, fontSize: 22, padding: '0 16px', cursor: loading ? 'not-allowed' : 'pointer' }} disabled={loading}>
            ➤
          </button>
        </form>
      </div>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: hover ? 63 : 56,
          height: hover ? 63 : 56,
          borderRadius: '50%',
          background: isDark ? '#2563eb' : '#2563eb',
          color: '#fff',
          border: 'none',
          boxShadow: hover
            ? '0 4px 18px 0 #2563eb80, 0 2px 8px rgba(0,0,0,0.15)'
            : '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
          filter: hover ? 'brightness(1.13) drop-shadow(0 0 8px #2563eb80)' : 'none',
        }}
        aria-label="Abrir chatbot"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563eb" xmlns="http://www.w3.org/2000/svg" style={{ background: 'none', borderRadius: '50%' }}>
          <circle cx="12" cy="12" r="12" fill="#2563eb" />
          <path d="M7 8h10M7 12h6M12 20c-4.418 0-8-2.91-8-6.5C4 7.91 7.582 5 12 5s8 2.91 8 6.5c0 1.61-1.01 3.06-2.67 4.09-.19.12-.33.32-.33.54v1.22c0 .89-1.08 1.34-1.71.71L14.59 17.3c-.19-.19-.44-.3-.71-.3H12z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
