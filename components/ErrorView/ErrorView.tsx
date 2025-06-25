import React from 'react';
import { Text, View } from 'react-native';

type ErrorViewProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

const ErrorView = ({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
  className = ''
}: ErrorViewProps) => {
  return (
    <View className={`flex-1 items-center justify-center p-4 ${className}`}>
      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
        {message}
      </Text>
    </View>
  );
};

export default ErrorView; 