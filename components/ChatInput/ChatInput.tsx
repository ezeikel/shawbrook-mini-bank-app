import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
};

const ChatInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type your message...',
  maxLength = 500,
  className = ''
}: ChatInputProps) => {
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <View className={`flex-row items-end gap-2 p-4 pb-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${className}`} style={{ paddingBottom: 64 }}>
      <TextInput
        className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        maxLength={maxLength}
        editable={!isLoading}
      />
      <TouchableOpacity
        className={`bg-shawbrook-pink disabled:bg-gray-300 rounded-2xl px-4 py-3 min-w-[60px] justify-center items-center`}
        onPress={handleSendMessage}
        disabled={!inputText.trim() || isLoading}
      >
        <Text className="text-white text-base font-semibold">Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput; 