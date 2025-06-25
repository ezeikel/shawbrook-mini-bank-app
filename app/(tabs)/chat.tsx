import { useChat } from '@/app/context/chat-context';
import ChatInput from '@/components/ChatInput/ChatInput';
import ChatMessage from '@/components/ChatMessage/ChatMessage';
import TypingIndicator from '@/components/TypingIndicator/TypingIndicator';
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const scrollViewRef = useRef<ScrollView>(null);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

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
            <ChatMessage
              key={message.id}
              text={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </ScrollView>
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat; 