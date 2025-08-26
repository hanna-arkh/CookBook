import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
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
