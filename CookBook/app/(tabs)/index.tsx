import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import RecipesItem from '@/components/RecipesItem'
import { FlatList, RefreshControl } from 'react-native'
import { Recipe } from '@/types/types'
import { COLORS, FONT_STYLES, LAYOUT } from '@/constants/Constants'
import { useRecipes } from '@/hooks/useRecipes'
import { UI_LABELS } from '@/constants/Strings'
import { AnimatedView } from '@/components/AnimatedView'
import { useTranslation } from 'react-i18next'
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage)
  throw new Error(errorMessage)
}
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!')

      return
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
    if (!projectId) {
      handleRegistrationError('Project ID not found')
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log(pushTokenString)

      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications')
  }
}

export default function ListOfRecipes() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: recipes = [], isLoading, error } = useRecipes()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { t } = useTranslation()
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  )
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch(error => setExpoPushToken(`${error}`))
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [])
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setSearchQuery('')
      setRefreshing(false)
    }, 2000)
  }
  const filteredRecipes: Recipe[] = useMemo(() => {
    if (!searchQuery) {
      return recipes
    }
    const query = searchQuery.toLowerCase().trim()

    return recipes.filter((recipe: Recipe) => recipe.strMeal.toLowerCase().includes(query))
  }, [recipes, searchQuery])
  if (error) {
    return (
      <View>
        <Text>{t('login.errors.couldntUploadRecipes')}</Text>
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>{t('common.loading')}</Text>
      </View>
    )
  }

  return (
    <AnimatedView>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>Your Expo push token: {expoPushToken}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Title: {notification && notification.request.content.title} </Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
          </View>
          <Button
            title="Press to Send Notification"
            onPress={async () => {
              await sendPushNotification(expoPushToken)
            }}
          />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={UI_LABELS.SEARCH}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => <RecipesItem item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.GREY]}
              progressBackgroundColor={COLORS.BLACK}
            />
          }
        />
      </SafeAreaView>
    </AnimatedView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: FONT_STYLES.WEIGHT.BOLD,
    marginVertical: 30,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: LAYOUT.WIDTH.EIGHTY_PERCENT,
  },
})
