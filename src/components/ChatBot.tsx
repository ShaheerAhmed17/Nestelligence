'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages([...messages, { from: 'user', text: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();
            setMessages((prev) => [...prev, { from: 'bot', text: data.reply || "Sorry, I couldn't generate a reply." }]);
        } catch (err) {
            setMessages((prev) => [...prev, { from: 'bot', text: 'Error fetching reply.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-card border border-border rounded-xl shadow-xl w-80 sm:w-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-primary p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary-foreground text-sm">Nestelligence Assistant</h3>
                                <p className="text-xs text-primary-foreground/80">Online</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-background/50">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground text-sm py-8">
                                <p>👋 Hi! How can I help you find your dream home today?</p>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-sm",
                                    msg.from === 'user'
                                        ? "bg-primary text-primary-foreground self-end rounded-br-none ml-auto"
                                        : "bg-muted text-foreground self-start rounded-bl-none"
                                )}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="self-start bg-muted p-3 rounded-2xl rounded-bl-none">
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-background border-t flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage} disabled={loading} size="icon" className="shrink-0">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </Button>
        </div>
    );
};
