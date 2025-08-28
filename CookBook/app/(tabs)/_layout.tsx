import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { COLORS } from '@/constants/Colors'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name']
  color: string
}) {
  return <AntDesign name="profile" size={24} color="grey" />
}

function TabBarIconDish(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name']
  color: string
}) {
  return <FontAwesome6 name="bowl-food" size={24} color="grey" />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.BLUE,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'List of recipes',
          tabBarIcon: ({ color }) => <TabBarIconDish color={color} name="bowl-food" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="profile" color={color} />,
        }}
      />
    </Tabs>
  )
}
