import React from 'react';
import { Text, View } from 'react-native';

type ChatMessageProps = {
  text: string;
  isUser: boolean;
  timestamp: Date;
  className?: string;
};

const ChatMessage = ({ text, isUser, timestamp, className = '' }: ChatMessageProps) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View className={`mb-4 max-w-[80%] ${isUser ? 'self-end' : 'self-start'} ${className}`}>
      <View
        className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-shawbrook-pink rounded-br-md' : 'bg-white dark:bg-gray-800 rounded-bl-md'}`}
        {...(!isUser && {
          style: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2
          }
        })}
      >
        <Text className={`text-base ${isUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {text}
        </Text>
        <Text className={`text-xs mt-1 ${isUser ? 'text-white/70 text-right' : 'text-gray-500 dark:text-gray-400'}`}>
          {formatTime(timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage; 