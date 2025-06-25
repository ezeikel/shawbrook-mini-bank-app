import AccountCard from '@/components/AccountCard/AccountCard';
import { MOCK_ACCOUNTS } from '@/constants/MockData';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
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
          <AccountCard
            key={account.id}
            account={account}
            onPress={handleAccountPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;