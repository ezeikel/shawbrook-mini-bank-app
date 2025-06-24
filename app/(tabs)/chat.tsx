import { useChat } from '@/app/context/chat-context';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row justify-between items-center p-4 bg-shawbrook-pink">
        <Text className="text-xl font-bold text-white">Shawbrook GPT</Text>
        <TouchableOpacity onPress={clearChat} className="px-3 py-1.5 bg-white/20 rounded">
          <Text className="text-white text-sm font-semibold">Clear</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 max-w-[80%] ${message.isUser ? 'self-end' : 'self-start'}`}
            >
              <View
                className={`px-4 py-3 rounded-2xl ${message.isUser ? 'bg-shawbrook-pink rounded-br-md' : 'bg-white dark:bg-gray-800 rounded-bl-md'}`}
                {...(!message.isUser && { style: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 } })}
              >
                <Text className={`text-base ${message.isUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{message.text}</Text>
                <Text className={`text-xs mt-1 ${message.isUser ? 'text-white/70 text-right' : 'text-gray-500 dark:text-gray-400'}`}>{formatTime(message.timestamp)}</Text>
              </View>
            </View>
          ))}
          {isLoading && (
            <View className="max-w-[80%] px-4 py-3 rounded-2xl mb-2 bg-white dark:bg-gray-800 self-start rounded-bl-md" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
              <View className="flex-row items-center">
                <Text className="ml-2 text-sm text-gray-600 italic">Assistant is typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>
        <View className="flex-row items-end gap-2 p-4 pb-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" style={{ paddingBottom: 64 }}>
          <TextInput
            className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat; 