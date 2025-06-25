import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type QuickActionCardProps = {
  title: string;
  icon: string;
  onPress: () => void;
  className?: string;
};

const QuickActionCard = ({
  title,
  icon,
  onPress,
  className = ''
}: QuickActionCardProps) => {
  return (
    <TouchableOpacity
      className={`bg-white dark:bg-gray-800 p-4 rounded-xl items-center w-[48%] shadow-sm mb-2 ${className}`}
      onPress={onPress}
    >
      <Text className="text-3xl mb-2">{icon}</Text>
      <Text className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard; 