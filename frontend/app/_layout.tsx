import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack,} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, } from 'react';
import 'react-native-reanimated';
import { Pressable } from "react-native";

import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="bars"
                    size={25}
                    color={"#303470"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            // backgroundColor: '#0f172a', 
          },
         
    }}>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ title: "Forum Jubiler", headerTitleStyle: {color:"#303470"} }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
