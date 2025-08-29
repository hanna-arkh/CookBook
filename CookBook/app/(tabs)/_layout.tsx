import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { COLORS, ROUTES, ICONS, UI_LABELS } from '@/constants/Constants'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name']
  color: string
}) {
  return <AntDesign name={ROUTES.PROFILE} size={24} color={COLORS.GREY} />
}

function TabBarIconDish(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name']
  color: string
}) {
  return <FontAwesome6 name={ICONS.BOWL_FOOD} size={24} color={COLORS.GREY} />
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
        name={ROUTES.MAIN_TAB_INDEX}
        options={{
          title: UI_LABELS.RECIPES_LIST,
          tabBarIcon: ({ color }) => <TabBarIconDish color={color} name={ICONS.BOWL_FOOD} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PROFILE}
        options={{
          title: UI_LABELS.PROFILE,
          tabBarIcon: ({ color }) => <TabBarIcon name={ROUTES.PROFILE} color={color} />,
        }}
      />
    </Tabs>
  )
}
