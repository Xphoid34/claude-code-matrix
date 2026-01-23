// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.frameCount = 0;
        this.speed = 5 // Higher = slower (update every N frames)

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    draw() {
        this.frameCount++;

        // Only update drops every N frames (controlled by speed)
        if (this.frameCount % this.speed !== 0) {
            return;
        }

        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0af';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Brighter character at the head of each column
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(char, x, y);

            // Dimmer trail
            this.ctx.fillStyle = '#0af';
            this.ctx.fillText(char, x, y - this.fontSize);

            // Reset drop when it goes off screen
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// TypeWriter Effect for Bot Messages
class TypeWriter {
    constructor(element, text, speed = 30) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.cursor = document.createElement('span');
        this.cursor.className = 'cursor';
    }

    start() {
        return new Promise((resolve) => {
            this.element.appendChild(this.cursor);
            this.type(resolve);
        });
    }

    type(resolve) {
        if (this.index < this.text.length) {
            // Insert character before cursor
            const char = this.text.charAt(this.index);
            const textNode = document.createTextNode(char);
            this.element.insertBefore(textNode, this.cursor);
            this.index++;

            // Variable speed for more natural typing
            const delay = char === ' ' ? this.speed / 2 :
                         char === '.' || char === '!' || char === '?' ? this.speed * 3 :
                         this.speed + Math.random() * 20;

            setTimeout(() => this.type(resolve), delay);
        } else {
            // Remove cursor when done
            setTimeout(() => {
                this.cursor.remove();
                resolve();
            }, 500);
        }
    }
}

// ChatBot Class
class ChatBot {
    constructor() {
        this.messageContainer = document.getElementById('message-container');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.isProcessing = false;

        this.init();
    }

    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Focus input on load
        this.userInput.focus();

        // Show welcome message
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message message-system welcome-text';
        welcomeDiv.innerHTML = `
            <div class="welcome-question">Do you wanna enter to the</div>
            <div class="ascii-art">
 ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
 ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
 ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝
 ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗
 ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
 ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
            </div>
            <p>Connection established. Welcome to the Matrix.</p>
            <p style="margin-top: 10px; font-size: 12px;">Type your message and press Enter to begin...</p>
        `;
        this.messageContainer.appendChild(welcomeDiv);
    }

    getTimestamp() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}]`;
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;

        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = this.getTimestamp();

        const text = document.createElement('div');
        text.className = 'message-text';

        if (type === 'user') {
            text.textContent = content;
            messageDiv.appendChild(timestamp);
            messageDiv.appendChild(text);
            this.messageContainer.appendChild(messageDiv);
            this.scrollToBottom();
            return Promise.resolve();
        } else {
            messageDiv.appendChild(timestamp);
            messageDiv.appendChild(text);
            this.messageContainer.appendChild(messageDiv);
            this.scrollToBottom();

            // Use typewriter effect for bot messages
            const typewriter = new TypeWriter(text, content);
            return typewriter.start().then(() => this.scrollToBottom());
        }
    }

    addErrorMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-bot message-error';

        const timestamp = document.createElement('div');
        timestamp.className = 'message-timestamp';
        timestamp.textContent = this.getTimestamp();

        const text = document.createElement('div');
        text.className = 'message-text';
        text.textContent = `[ERROR] ${content}`;

        messageDiv.appendChild(timestamp);
        messageDiv.appendChild(text);
        this.messageContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        this.messageContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    async sendMessage() {
        const message = this.userInput.value.trim();

        if (!message || this.isProcessing) return;

        this.isProcessing = true;
        this.sendButton.disabled = true;
        this.userInput.value = '';

        // Add user message
        await this.addMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await this.sendToN8n(message);
            this.hideTypingIndicator();
            await this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addErrorMessage(error.message);
        }

        this.isProcessing = false;
        this.sendButton.disabled = false;
        this.userInput.focus();
    }

    async sendToN8n(message) {
        // Check if in demo mode
        if (typeof CONFIG !== 'undefined' && CONFIG.demoMode) {
            return this.getDemoResponse(message);
        }

        // Detect if running in production (Vercel) or local development
        const isProduction = this.isProductionEnvironment();

        try {
            let response;

            if (isProduction) {
                // Production: Use serverless API proxy (webhook URL is secure on server)
                const url = `/api/chat?message=${encodeURIComponent(message)}`;
                response = await fetch(url, { method: 'GET' });
            } else {
                // Local development: Use config.js webhook URL directly
                if (typeof CONFIG === 'undefined' || !CONFIG.webhookUrl || CONFIG.webhookUrl.includes('YOUR_N8N_WEBHOOK')) {
                    throw new Error('Matrix connection not configured. Copy config.example.js to config.js and add your webhook URL.');
                }

                const method = CONFIG.httpMethod || 'GET';

                if (method === 'GET') {
                    const url = `${CONFIG.webhookUrl}?message=${encodeURIComponent(message)}`;
                    response = await fetch(url, { method: 'GET' });
                } else {
                    response = await fetch(CONFIG.webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message: message })
                    });
                }
            }

            if (!response.ok) {
                throw new Error(`Matrix signal disrupted. Status: ${response.status}`);
            }

            const data = await response.json();

            // Handle various response formats from n8n
            if (Array.isArray(data) && data.length > 0 && data[0].text) {
                // Array format: [{ "text": "..." }]
                return data[0].text;
            } else if (data.output && data.output.text) {
                // Nested format: { output: { text: "..." } }
                return data.output.text;
            } else if (data.output) {
                return data.output;
            } else if (data.response) {
                return data.response;
            } else if (data.text) {
                return data.text;
            } else if (typeof data === 'string') {
                return data;
            } else {
                return JSON.stringify(data);
            }
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Unable to reach the Matrix. Check your connection.');
            }
            throw error;
        }
    }

    isProductionEnvironment() {
        const hostname = window.location.hostname;
        // Check for Vercel deployment or other production indicators
        return hostname.includes('vercel.app') ||
               hostname.includes('.vercel.') ||
               (!hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes('file://'));
    }

    getDemoResponse(message) {
        // Simulate network delay
        return new Promise((resolve) => {
            const delay = 500 + Math.random() * 1000;
            setTimeout(() => {
                const responses = [
                    "I've been expecting you. The Matrix has many questions, but few answers.",
                    "What you know you can't explain, but you feel it. You've felt it your entire life.",
                    "The answer is out there, Neo. It's looking for you, and it will find you if you want it to.",
                    "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.",
                    "Free your mind. The code flows through all things.",
                    "There is no spoon. There is only the message you send.",
                    "I can only show you the door. You're the one that has to walk through it.",
                    "The Matrix is everywhere. It is all around us. Even now, in this very conversation."
                ];

                // Simple keyword responses
                const lowerMessage = message.toLowerCase();
                if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                    resolve("Wake up... The Matrix has you. Follow the white rabbit.");
                } else if (lowerMessage.includes('who are you')) {
                    resolve("I am a construct, a program. I'm here to guide you through the digital realm.");
                } else if (lowerMessage.includes('help')) {
                    resolve("Help? I can show you how deep the rabbit hole goes. Just ask your questions.");
                } else if (lowerMessage.includes('bye') || lowerMessage.includes('exit')) {
                    resolve("Remember... All I'm offering is the truth. Nothing more. Until next time.");
                } else {
                    resolve(responses[Math.floor(Math.random() * responses.length)]);
                }
            }, delay);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const canvas = document.getElementById('matrix-canvas');
    new MatrixRain(canvas);

    // Initialize ChatBot
    new ChatBot();

    // Terminal button effects (cosmetic)
    document.querySelector('.btn-close')?.addEventListener('click', () => {
        document.querySelector('.terminal').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.terminal').style.opacity = '1';
        }, 1000);
    });

    document.querySelector('.btn-minimize')?.addEventListener('click', () => {
        const terminal = document.querySelector('.terminal');
        terminal.style.transform = terminal.style.transform === 'scale(0.1)' ? 'scale(1)' : 'scale(0.1)';
    });
});
