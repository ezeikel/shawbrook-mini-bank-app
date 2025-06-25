import React from 'react';
import { Text, View } from 'react-native';

type TypingIndicatorProps = {
  message?: string;
  className?: string;
};

const TypingIndicator = ({
  message = 'Assistant is typing...',
  className = ''
}: TypingIndicatorProps) => {
  return (
    <View className={`max-w-[80%] px-4 py-3 rounded-2xl mb-2 bg-white dark:bg-gray-800 self-start rounded-bl-md ${className}`} style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
      <View className="flex-row items-center">
        <Text className="ml-2 text-sm text-gray-600 italic">{message}</Text>
      </View>
    </View>
  );
};

export default TypingIndicator; 