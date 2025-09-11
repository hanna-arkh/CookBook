import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { AnimatedView } from '@/components/AnimatedView'
import { useAuthStore } from '@/store/store'
import { FontAwesome } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { isLoggedIn } = useAuthStore()
  const email = useAuthStore(state => state.currentUser)
  const router = useRouter()
  const { t } = useTranslation()
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.AUTH)
    }
  }, [isLoggedIn, router])

  return (
    <AnimatedView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <FontAwesome name="user-o" size={40} color={COLORS.BUTTON_REGISTRATION} />
          </View>
          <Text style={styles.title}>{t('profile.title')}</Text>
          <Text style={styles.emailText}>{email}</Text>
          <Text style={styles.infoText}>{t('profile.mainProfile')}</Text>
        </View>
      </View>
    </AnimatedView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY,
  },
  container: {
    flex: 1,
    justifyContent: LAYOUT.ALIGN.CENTER,
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: LAYOUT.ALIGN.CENTER,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: LAYOUT.ALIGN.CENTER,
    alignItems: LAYOUT.ALIGN.CENTER,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: COLORS.BUTTON_REGISTRATION,
    fontWeight: '500',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.GREY,
    textAlign: LAYOUT.ALIGN.CENTER,
  },
})
