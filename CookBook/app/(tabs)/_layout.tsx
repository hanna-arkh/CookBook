import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { COLORS, ROUTES, ICONS } from '@/constants/Constants'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
          title: t('profile.listOfRecipes'),
          tabBarIcon: ({ color }) => <TabBarIconDish color={color} name={ICONS.BOWL_FOOD} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PROFILE}
        options={{
          title: t('profile.title'),
          tabBarIcon: ({ color }) => <TabBarIcon name={ROUTES.PROFILE} color={color} />,
        }}
      />
    </Tabs>
  )
}
