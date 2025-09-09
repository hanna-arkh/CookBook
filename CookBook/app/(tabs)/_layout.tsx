import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { COLORS, ROUTES, ICONS } from '@/constants/Constants'
import { useTranslation } from 'react-i18next'

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
          tabBarIcon: () => <FontAwesome6 name={ICONS.BOWL_FOOD} size={24} color={COLORS.GREY} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PROFILE}
        options={{
          title: t('profile.title'),
          tabBarIcon: () => <FontAwesome5 name={ICONS.LIST} size={24} color={COLORS.GREY} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.SETTINGS}
        options={{
          title: t('profile.settings'),
          tabBarIcon: () => <Ionicons name={ICONS.SETTINGS} size={24} color={COLORS.GREY} />,
        }}
      />
    </Tabs>
  )
}
