import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

import { AuthProvider } from '@/app/context/auth-context';
import { ChatProvider } from '@/app/context/chat-context';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/app/context/theme-context';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <View
        className={`flex-1 ${isDark ? 'dark' : ''}`}
        style={{ colorScheme: isDark ? 'dark' : 'light' }}
      >
        {children}
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <ChatProvider>
        <CustomThemeProvider>
          <ThemeWrapper>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="account-detail" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="settings-modal" options={{ presentation: 'modal', headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeWrapper>
        </CustomThemeProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
