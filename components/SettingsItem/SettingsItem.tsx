import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

type SettingsItemProps = {
  icon: any;
  title: string;
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isDestructive?: boolean;
  className?: string;
};

const SettingsItem = ({
  icon,
  title,
  onPress,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
  isDestructive = false,
  className = ''
}: SettingsItemProps) => {
  const iconColor = isDestructive ? '#DC2626' : (switchValue ? '#FFD700' : '#222');

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-5 py-4 ${className}`}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View className="flex-row items-center">
        <FontAwesomeIcon icon={icon} size={22} color={iconColor} />
        <Text className={`ml-4 text-lg ${isDestructive ? 'text-red-600 font-semibold' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </Text>
      </View>
      {isSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          thumbColor={switchValue ? '#FFD700' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#4B5563' }}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingsItem; 