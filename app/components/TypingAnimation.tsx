import React from 'react';

const TypingAnimation: React.FC = () => {
    return (
        <div className="flex items-center space-x-1 p-2 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    );
};

export default TypingAnimation;
