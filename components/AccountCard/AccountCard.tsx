import { formatCurrency, type Account } from '@/constants/MockData';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type AccountCardProps = {
  account: Account;
  onPress?: (accountId: string) => void;
  showBalance?: boolean;
  className?: string;
};

const AccountCard = ({
  account,
  onPress,
  showBalance = true,
  className = ''
}: AccountCardProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(account.id);
    }
  };

  return (
    <TouchableOpacity
      className={`bg-white dark:bg-gray-800 p-5 rounded-2xl mb-4 flex-row justify-between items-center shadow-sm ${className}`}
      onPress={handlePress}
      disabled={!onPress}
    >
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {account.name}
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400">
          {account.number}
        </Text>
      </View>
      {showBalance && (
        <Text className="text-2xl font-bold text-shawbrook-pink">
          {formatCurrency(account.balance)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AccountCard; 