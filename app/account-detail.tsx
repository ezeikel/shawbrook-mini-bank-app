import { formatCurrency, formatTransactionAmount, getAccountById, getTransactionsByAccountId } from '@/constants/MockData';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountDetail = () => {
  const params = useLocalSearchParams();
  const accountId = params.id as string;

  const account = getAccountById(accountId);
  const transactions = getTransactionsByAccountId(accountId);

  if (!account) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-row items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Text className="text-shawbrook-pink text-base">← Back</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900 dark:text-white">Account Not Found</Text>
        </View>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center mt-5">The requested account could not be found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-shawbrook-pink text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Account Details</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{account?.name}</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mb-0.5"><Text className="font-semibold text-gray-700 dark:text-gray-300">Account:</Text> {account?.number}</Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 mb-2"><Text className="font-semibold text-gray-700 dark:text-gray-300">Sort Code:</Text> {account?.sortCode}</Text>
          <Text className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Balance:</Text>
          <Text className="text-3xl font-bold text-shawbrook-pink mb-2">{formatCurrency(account.balance)}</Text>
        </View>
        <View className="flex-row gap-4 mb-6">
          <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-xl items-center flex-row justify-center gap-2">
            <Text className="text-lg">💳</Text>
            <Text className="text-lg text-white font-semibold">Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-xl items-center flex-row justify-center gap-2">
            <Text className="text-lg">💰</Text>
            <Text className="text-lg text-white font-semibold">Deposit</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">Recent Transactions</Text>
          {transactions.map((txn) => (
            <View key={`${accountId}-${txn.id}`} className="flex-row justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <View>
                <Text className="text-lg text-gray-900 dark:text-white mb-0.5">{txn.description}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">{txn.date}</Text>
              </View>
              <Text className={`text-lg font-semibold ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatTransactionAmount(txn.amount)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetail; 