import { MOCK_ACCOUNTS, formatCurrency } from '@/constants/MockData';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accounts = () => {
  const handleAccountPress = (accountId: string) => {
    router.push(`/account-detail?id=${accountId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">My Accounts</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {MOCK_ACCOUNTS.map((account) => (
          <TouchableOpacity
            key={account.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl mb-4 flex-row justify-between items-center shadow-sm"
            onPress={() => handleAccountPress(account.id)}
          >
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">{account.name}</Text>
              <Text className="text-lg text-gray-500 dark:text-gray-400">{account.number}</Text>
            </View>
            <Text className="text-2xl font-bold text-shawbrook-pink">{formatCurrency(account.balance)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;