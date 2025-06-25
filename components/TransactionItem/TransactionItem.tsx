import { formatTransactionAmount, type Transaction } from '@/constants/MockData';
import React from 'react';
import { Text, View } from 'react-native';

type TransactionItemProps = {
  transaction: Transaction;
  showAccountName?: boolean;
  accountName?: string;
  className?: string;
};

const TransactionItem = ({
  transaction,
  showAccountName = false,
  accountName,
  className = ''
}: TransactionItemProps) => {
  return (
    <View className={`flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 ${className}`}>
      <View className="flex-1">
        <Text className="text-lg text-gray-900 dark:text-white mb-0.5">
          {transaction.description}
        </Text>
        {showAccountName && accountName && (
          <Text className="text-sm text-shawbrook-pink mb-0.5">
            {accountName}
          </Text>
        )}
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {transaction.date}
        </Text>
      </View>
      <Text className={`text-lg font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {formatTransactionAmount(transaction.amount)}
      </Text>
    </View>
  );
};

export default TransactionItem; 