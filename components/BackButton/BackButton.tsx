import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type BackButtonProps = {
  onPress?: () => void;
  text?: string;
  className?: string;
};

const BackButton = ({ onPress, text = '← Back', className = '' }: BackButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} className={`mr-4 ${className}`}>
      <Text className="text-shawbrook-pink text-base">{text}</Text>
    </TouchableOpacity>
  );
};

export default BackButton; 