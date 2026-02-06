// Initialize messages page
let conversations = [];
let currentConversation = null;

document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    if (user) {
        loadUserInfo();
        loadConversations();
    }
});

function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;
}

function loadConversations() {
    // Get or create sample conversations
    let storedConvos = localStorage.getItem('conversations');
    
    if (!storedConvos) {
        // Create sample conversations
        conversations = [
            {
                id: 1,
                name: 'Tech Club',
                subtitle: 'Frontend Developer Intern',
                avatar: 'TC',
                lastMessage: 'Great! When can you start?',
                lastMessageTime: new Date().toISOString(),
                unread: 2,
                messages: [
                    {
                        id: 1,
                        sender: 'Tech Club',
                        content: 'Hi! Thanks for applying to our Frontend Developer position.',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        sent: false
                    },
                    {
                        id: 2,
                        sender: 'You',
                        content: "Thank you! I'm very excited about this opportunity.",
                        timestamp: new Date(Date.now() - 3000000).toISOString(),
                        sent: true
                    },
                    {
                        id: 3,
                        sender: 'Tech Club',
                        content: 'Great! When can you start?',
                        timestamp: new Date().toISOString(),
                        sent: false
                    }
                ]
            },
            {
                id: 2,
                name: 'CS Department',
                subtitle: 'Research Assistant',
                avatar: 'CS',
                lastMessage: 'Your resume looks impressive',
                lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
                unread: 0,
                messages: [
                    {
                        id: 1,
                        sender: 'CS Department',
                        content: 'Hello! We reviewed your application for the Research Assistant position.',
                        timestamp: new Date(Date.now() - 172800000).toISOString(),
                        sent: false
                    },
                    {
                        id: 2,
                        sender: 'CS Department',
                        content: 'Your resume looks impressive. Would you be available for an interview next week?',
                        timestamp: new Date(Date.now() - 86400000).toISOString(),
                        sent: false
                    }
                ]
            },
            {
                id: 3,
                name: 'Student Union',
                subtitle: 'Event Photographer',
                avatar: 'SU',
                lastMessage: 'Sounds perfect!',
                lastMessageTime: new Date(Date.now() - 259200000).toISOString(),
                unread: 0,
                messages: [
                    {
                        id: 1,
                        sender: 'You',
                        content: 'Hi! I can bring my professional camera and editing equipment.',
                        timestamp: new Date(Date.now() - 302400000).toISOString(),
                        sent: true
                    },
                    {
                        id: 2,
                        sender: 'Student Union',
                        content: 'Sounds perfect! The event is on March 15th.',
                        timestamp: new Date(Date.now() - 259200000).toISOString(),
                        sent: false
                    }
                ]
            }
        ];
        
        localStorage.setItem('conversations', JSON.stringify(conversations));
    } else {
        conversations = JSON.parse(storedConvos);
    }
    
    displayChatList();
}

function displayChatList() {
    const chatList = document.getElementById('chatList');
    
    if (conversations.length === 0) {
        chatList.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; color: var(--gray-400);">
                <p>No messages yet</p>
                <p style="font-size: 14px;">Start applying to jobs to connect with employers</p>
            </div>
        `;
        return;
    }
    
    const chatsHTML = conversations.map(convo => {
        const timeAgo = formatTimeAgo(convo.lastMessageTime);
        const activeClass = currentConversation && currentConversation.id === convo.id ? 'active' : '';
        
        return `
            <div class="chat-item ${activeClass}" onclick="openConversation(${convo.id})">
                <div style="display: flex; gap: 12px;">
                    <div class="user-avatar" style="width: 48px; height: 48px; flex-shrink: 0;">${convo.avatar}</div>
                    <div style="flex: 1; min-width: 0;">
                        <div class="chat-header">
                            <span class="chat-name">${convo.name}</span>
                            <span class="chat-time">${timeAgo}</span>
                        </div>
                        <p style="font-size: 12px; color: var(--gray-500); margin: 2px 0;">${convo.subtitle}</p>
                        <p class="chat-preview">${convo.lastMessage}</p>
                    </div>
                    ${convo.unread > 0 ? `<span class="chat-unread">${convo.unread}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    chatList.innerHTML = chatsHTML;
}

function openConversation(convoId) {
    currentConversation = conversations.find(c => c.id === convoId);
    if (!currentConversation) return;
    
    // Mark as read
    currentConversation.unread = 0;
    localStorage.setItem('conversations', JSON.stringify(conversations));
    
    // Update UI
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('activeChat').style.display = 'flex';
    
    // Update header
    document.getElementById('chatAvatar').textContent = currentConversation.avatar;
    document.getElementById('chatName').textContent = currentConversation.name;
    document.getElementById('chatSubtitle').textContent = currentConversation.subtitle;
    
    // Display messages
    displayMessages();
    
    // Update chat list
    displayChatList();
    
    // Scroll to bottom
    setTimeout(() => {
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 100);
}

function displayMessages() {
    const messagesDiv = document.getElementById('chatMessages');
    
    const messagesHTML = currentConversation.messages.map(msg => {
        const messageClass = msg.sent ? 'sent' : 'received';
        const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="message ${messageClass}">
                ${!msg.sent ? `<div class="message-avatar">${currentConversation.avatar}</div>` : ''}
                <div class="message-content">
                    <div class="message-bubble">${msg.content}</div>
                    <div class="message-time">${time}</div>
                </div>
                ${msg.sent ? `<div class="message-avatar">${document.getElementById('userAvatar').textContent}</div>` : ''}
            </div>
        `;
    }).join('');
    
    messagesDiv.innerHTML = messagesHTML;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    
    if (!content || !currentConversation) return;
    
    // Create new message
    const newMessage = {
        id: currentConversation.messages.length + 1,
        sender: 'You',
        content: content,
        timestamp: new Date().toISOString(),
        sent: true
    };
    
    // Add to conversation
    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = content;
    currentConversation.lastMessageTime = newMessage.timestamp;
    
    // Save
    localStorage.setItem('conversations', JSON.stringify(conversations));
    
    // Update UI
    displayMessages();
    displayChatList();
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    setTimeout(() => {
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 100);
    
    // Simulate response after 2 seconds
    setTimeout(() => {
        const response = {
            id: currentConversation.messages.length + 1,
            sender: currentConversation.name,
            content: getAutoResponse(),
            timestamp: new Date().toISOString(),
            sent: false
        };
        
        currentConversation.messages.push(response);
        currentConversation.lastMessage = response.content;
        currentConversation.lastMessageTime = response.timestamp;
        currentConversation.unread = 1;
        
        localStorage.setItem('conversations', JSON.stringify(conversations));
        
        if (currentConversation === conversations.find(c => c.id === currentConversation.id)) {
            displayMessages();
            currentConversation.unread = 0;
        }
        displayChatList();
        
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 2000);
}

function getAutoResponse() {
    const responses = [
        "Thanks for your message! I'll get back to you shortly.",
        "That sounds great! Let me check and confirm.",
        "Perfect! I'll send you more details soon.",
        "Got it! I appreciate your quick response.",
        "Excellent! Looking forward to working with you."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
