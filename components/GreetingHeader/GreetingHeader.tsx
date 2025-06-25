import { getHours } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';

type GreetingHeaderProps = {
  userName?: string;
  className?: string;
};

const GreetingHeader = ({ userName, className = '' }: GreetingHeaderProps) => {
  const getGreeting = () => {
    const hour = getHours(new Date());

    if (hour < 12) {
      return 'Good morning!';
    } else if (hour < 17) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  return (
    <View className={`mb-6 ${className}`}>
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {getGreeting()}
      </Text>
      <Text className="text-lg text-gray-600 dark:text-gray-300">
        Welcome to Shawbrook Bank
      </Text>
    </View>
  );
};

export default GreetingHeader; 