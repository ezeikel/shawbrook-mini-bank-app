import { useAuth } from '@/app/context/auth-context';
import { BiometricAuth } from '@/app/services/biometric-auth';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const { login } = useAuth();
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const [pin, setPin] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const available = await BiometricAuth.isBiometricAvailable();
      const types = await BiometricAuth.getSupportedTypes();
      setIsBiometricAvailable(available);
      setBiometricType(BiometricAuth.getBiometricTypeName(types));
    } catch (error) {
      console.error('Error checking biometric availability:', error);
    }
  };

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    try {
      const success = await BiometricAuth.authenticate();
      if (success) {
        await login();
      } else {
        Alert.alert('Authentication Failed', 'Please try again or use PIN');
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric authentication failed. Please use PIN.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePinAuth = async () => {
    if (pin === '1234') {
      await login();
    } else {
      Alert.alert('Error', 'Invalid PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center">
      <View className="px-8 py-10 bg-white dark:bg-gray-800 rounded-2xl mx-4 shadow-lg">
        <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Welcome to Shawbrook Bank</Text>
        {isBiometricAvailable ? (
          <TouchableOpacity
            onPress={handleBiometricAuth}
            className="bg-shawbrook-pink py-4 rounded-xl items-center mb-6"
            disabled={isAuthenticating}
          >
            <Text className="text-lg text-white font-semibold">
              Login with {biometricType}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
            <Text className="text-center text-yellow-800 dark:text-yellow-200">
              {biometricType ? `${biometricType} not available` : 'Biometric authentication not available'}
            </Text>
          </View>
        )}
        <Text className="text-lg text-gray-700 dark:text-gray-200 mb-2">Or enter your PIN</Text>
        <TextInput
          className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-lg text-gray-900 dark:text-white mb-4 border border-gray-200 dark:border-gray-700"
          placeholder="Enter PIN"
          placeholderTextColor="#888"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
          editable={!isAuthenticating}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={handlePinAuth}
          className="bg-shawbrook-pink py-4 rounded-xl items-center"
          disabled={pin.length !== 4}
        >
          <Text className="text-lg text-white font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login; 