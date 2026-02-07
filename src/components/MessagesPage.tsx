import { Send, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

export function MessagesPage() {
  const { currentUser, messages, users, sendMessage, selectedChatUserId, setSelectedChatUser } = useStore();
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) return null;

  // Get unique conversation partners
  const chatPartnerIds = Array.from(new Set(
    messages
      .filter(m => m.senderId === currentUser.id || m.receiverId === currentUser.id)
      .flatMap(m => [m.senderId, m.receiverId])
      .filter(id => id !== currentUser.id)
  ));

  const chatPartners = chatPartnerIds.map(id => users.find(u => u.id === id)!).filter(Boolean);

  // If there's a selected chat user not in the list, add them
  if (selectedChatUserId && !chatPartnerIds.includes(selectedChatUserId)) {
    const user = users.find(u => u.id === selectedChatUserId);
    if (user) chatPartners.unshift(user);
  }

  const activeChat = selectedChatUserId || (chatPartners.length > 0 ? chatPartners[0]?.id : null);
  const activeChatUser = users.find(u => u.id === activeChat);

  const chatMessages = activeChat
    ? messages.filter(m =>
        (m.senderId === currentUser.id && m.receiverId === activeChat) ||
        (m.senderId === activeChat && m.receiverId === currentUser.id)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  const handleSend = () => {
    if (!newMsg.trim() || !activeChat) return;
    sendMessage(activeChat, newMsg.trim());
    setNewMsg('');
  };

  const getLastMessage = (userId: string) => {
    const msgs = messages.filter(m =>
      (m.senderId === currentUser.id && m.receiverId === userId) ||
      (m.senderId === userId && m.receiverId === currentUser.id)
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return msgs[0];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ height: '70vh' }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className={`${activeChat && 'hidden md:block'} w-full md:w-80 border-r border-gray-200 overflow-y-auto`}>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
            </div>
            {chatPartners.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                <p>No conversations yet.</p>
                <p className="mt-1">Start by messaging a seller!</p>
              </div>
            ) : (
              chatPartners.map(partner => {
                const lastMsg = getLastMessage(partner.id);
                return (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedChatUser(partner.id)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                      activeChat === partner.id ? 'bg-emerald-50 border-r-2 border-emerald-500' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 text-sm truncate">{partner.name}</p>
                        {lastMsg && (
                          <span className="text-xs text-gray-400">{new Date(lastMsg.timestamp).toLocaleDateString()}</span>
                        )}
                      </div>
                      {lastMsg && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">{lastMsg.content}</p>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Chat Area */}
          <div className={`${!activeChat && 'hidden md:flex'} flex-1 flex flex-col`}>
            {activeChat && activeChatUser ? (
              <>
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <button onClick={() => setSelectedChatUser(null)} className="md:hidden text-gray-400 hover:text-gray-600">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                    {activeChatUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{activeChatUser.name}</p>
                    <p className="text-xs text-gray-500">{activeChatUser.department} • {activeChatUser.university}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm py-12">
                      <p>No messages yet. Say hello! 👋</p>
                    </div>
                  )}
                  {chatMessages.map(msg => {
                    const isMine = msg.senderId === currentUser.id;
                    return (
                      <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl ${
                          isMine
                            ? 'bg-emerald-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${isMine ? 'text-emerald-200' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMsg.trim()}
                      className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-5xl mb-3">💬</div>
                  <p className="font-medium">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
