import { useAuth } from '@/app/context/auth-context';
import { useTheme } from '@/app/context/theme-context';
import { faMoon, faSignOut, faSun, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from 'expo-router';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsModal = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-row items-center justify-between px-6 pt-10 pb-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Settings</Text>
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <FontAwesomeIcon icon={faXmark} size={26} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      <View className="mt-6 mx-4 rounded-2xl bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 shadow">
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} size={22} color={isDark ? '#FFD700' : '#222'} />
            <Text className="ml-4 text-lg text-gray-900 dark:text-white">Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? '#FFD700' : '#f4f3f4'}
            trackColor={{ false: '#ccc', true: '#4B5563' }}
          />
        </View>
        <TouchableOpacity className="flex-row items-center px-5 py-4" onPress={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} size={22} color="#DC2626" />
          <Text className="ml-4 text-lg text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsModal; 