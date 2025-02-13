import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'
import { Stack } from 'expo-router/stack';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY
      }}
    >
      <Tabs.Screen name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='favorite'
        options={{
          tabBarActiveTintColor: Colors.RED, //--> tab bar aktif olduğunda gözükecek renk seçildi
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='inbox'
        options={{
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='TeamSelection'
        options={{
          title: 'TeamSelection',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tabs>

  )
}