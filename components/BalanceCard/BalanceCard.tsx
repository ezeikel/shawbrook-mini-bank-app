import { formatCurrency } from '@/constants/MockData';
import React from 'react';
import { Text, View } from 'react-native';

type BalanceCardProps = {
  balance: number;
  title?: string;
  className?: string;
};

const BalanceCard = ({
  balance,
  title = 'Total Balance',
  className = ''
}: BalanceCardProps) => {
  return (
    <View className={`bg-shawbrook-pink p-6 rounded-2xl mb-6 items-center ${className}`}>
      <Text className="text-lg text-white/80 mb-2">{title}</Text>
      <Text className="text-4xl font-bold text-white">{formatCurrency(balance)}</Text>
    </View>
  );
};

export default BalanceCard; 