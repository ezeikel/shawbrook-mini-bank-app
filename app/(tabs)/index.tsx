import { useTheme } from '@/app/context/theme-context';
import BalanceCard from '@/components/BalanceCard/BalanceCard';
import GreetingHeader from '@/components/GreetingHeader/GreetingHeader';
import Logo from '@/components/Logo';
import QuickActionCard from '@/components/QuickActionCard/QuickActionCard';
import TransactionItem from '@/components/TransactionItem/TransactionItem';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, type Account, type Transaction } from '@/constants/MockData';
import { faGear } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  // calculate total balance from all accounts
  const totalBalance = (MOCK_ACCOUNTS as Account[]).reduce((total: number, account: Account) => {
    return total + account.balance;
  }, 0);

  const quickActions = [
    { id: '1', title: 'Transfer Money', icon: '💸', action: () => { } },
    { id: '2', title: 'Pay Bills', icon: '📄', action: () => { } },
    { id: '3', title: 'Top Up', icon: '💰', action: () => { } },
    { id: '4', title: 'Get Help', icon: '💬', action: () => router.push('/(tabs)/chat') },
  ];

  // get recent transactions from all accounts
  const getAllTransactions = () => {
    const allTransactions: (Transaction & { accountName: string })[] = [];
    Object.entries(MOCK_TRANSACTIONS as { [key: string]: Transaction[] }).forEach(([accountId, transactions]) => {
      const account = (MOCK_ACCOUNTS as Account[]).find((acc: Account) => acc.id === accountId);
      if (account) {
        transactions.forEach((transaction: Transaction) => {
          allTransactions.push({
            ...transaction,
            accountName: account.name,
          });
        });
      }
    });
    return allTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };

  const recentActivity = getAllTransactions();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <Logo width={180} height={38} color={theme === 'dark' ? 'white' : '#E10A93'} />
        <TouchableOpacity onPress={() => navigation.navigate('settings-modal')} className="px-3 py-1.5">
          <FontAwesomeIcon icon={faGear} size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 p-4">
        <GreetingHeader />
        <BalanceCard balance={totalBalance} />
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.id}
                title={action.title}
                icon={action.icon}
                onPress={action.action}
              />
            ))}
          </View>
        </View>
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/accounts')}>
              <Text className="text-lg text-shawbrook-pink font-semibold">View All</Text>
            </TouchableOpacity>
          </View>
          {recentActivity.map((activity) => (
            <TransactionItem
              key={activity.id}
              transaction={activity}
              showAccountName={true}
              accountName={activity.accountName}
              className="last:border-b-0"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;