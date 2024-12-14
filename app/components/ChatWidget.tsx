"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import chatbotApiRequest from "../apiRequests/chatbot";
import TypingAnimation from "./TypingAnimation";

interface Message {
    text: string;
    sender: "user" | "bot";
}

const BotAvatar: React.FC = () => (
    <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#4F46E5" />
        <path d="M20 28C20 25.7909 21.7909 24 24 24H40C42.2091 24 44 25.7909 44 28V36C44 38.2091 42.2091 40 40 40H24C21.7909 40 20 38.2091 20 36V28Z" fill="white" />
        <circle cx="26" cy="32" r="2" fill="#4F46E5" />
        <circle cx="38" cy="32" r="2" fill="#4F46E5" />
        <path d="M30 36H34V37C34 38.1046 33.1046 39 32 39C30.8954 39 30 38.1046 30 37V36Z" fill="#4F46E5" />
    </svg>
);

const UserAvatar: React.FC = () => (
    <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#10B981" />
        <circle cx="32" cy="26" r="10" fill="white" />
        <path d="M18 49.3333C18 42.7056 23.3726 37.3333 30 37.3333H34C40.6274 37.3333 46 42.7056 46 49.3333C46 52.2789 43.6122 54.6667 40.6667 54.6667H23.3333C20.3878 54.6667 18 52.2789 18 49.3333Z" fill="white" />
    </svg>
);

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! How can I help you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages, isWaiting]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setIsWaiting(true);

        try {
            const response = await chatbotApiRequest.getChatbotData({
                message: input,
            });

            setMessages((prev) => [
                ...prev,
                { text: response.message, sender: "bot" },
            ]);
        } catch (error: any) {
            console.error("Chatbot API Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, something went wrong. Please try again later.",
                    sender: "bot",
                },
            ]);
        } finally {
            setIsWaiting(false);
        }
    };

    const renderMessage = (message: Message, index: number) => {
        const isUser = message.sender === "user";
        return (
            <div
                key={index}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
                {!isUser && (
                    <div className="mr-2">
                        <BotAvatar />
                    </div>
                )}
                <div
                    className={`max-w-[70%] p-3 rounded-lg ${isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                        }`}
                >
                    {message.text}
                </div>
                {isUser && (
                    <div className="ml-2">
                        <UserAvatar />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen ? (
                <Card className="w-96 h-[600px] shadow-lg flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold">Chat Support</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat}>
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden p-0">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            {messages.map((message, index) => renderMessage(message, index))}
                            {isWaiting && (
                                <div className="flex justify-start">
                                    <div className="mr-2">
                                        <BotAvatar />
                                    </div>
                                    <TypingAnimation />
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isWaiting}
                            />
                            <Button type="submit" size="icon" disabled={isWaiting}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={toggleChat}
                    className="rounded-full w-12 h-12 shadow-lg"
                >
                    <MessageSquare className="w-6 h-6" />
                </Button>
            )}
        </div>
    );
};

export default ChatWidget;

