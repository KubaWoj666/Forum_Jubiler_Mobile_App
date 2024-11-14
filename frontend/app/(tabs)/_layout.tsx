import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import  Ionicons  from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} size={24} color={"#FFD700"}/>
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          
          tabBarButton: () => null, 
        }}
      />

      <Tabs.Screen
              name="cart"
              options={{
                title: 'Cart',
                tabBarIcon: ({ color, focused }) => (
                  // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                  <Ionicons name={focused ? "cart" : "cart-outline"}  size={24} color={"#FFD700"}/>
                ),
              }}
            />

      <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                  // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                  <Ionicons name={focused ? "person" : "person-outline"}  size={24} color={"#FFD700"}/>
                ),
              }}
            />
      <Tabs.Screen
              name="search"
              options={{
                title: 'Search',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? "search" : "search-outline"}  size={24} color={"#FFD700"}/>
                ),
              }}
            />
            

    </Tabs>
    
  );
}
