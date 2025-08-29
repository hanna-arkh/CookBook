import React from 'react'
import { Stack } from 'expo-router'
import { ROUTES } from '@/constants/Constants'
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_TAB_INDEX} />
      <Stack.Screen name={ROUTES.REGISTER_NAME} />
    </Stack>
  )
}
