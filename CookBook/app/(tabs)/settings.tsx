import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ButtonQuit } from '@/components/ButtonQuit'
import { COLORS, LAYOUT, ROUTES } from '@/constants/Constants'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/store'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { AnimatedView } from '@/components/AnimatedView'
import { FontAwesome } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function SettingsScreen() {
  const { logout } = useAuthStore()
  const router = useRouter()
  const { t } = useTranslation()
  const handleLogout = () => {
    logout()
    router.replace(ROUTES.AUTH)
  }

  return (
    <AnimatedView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings.settings')}</Text>
          <Text style={styles.subtitle}>{t('settings.manageAccText')}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="globe" size={20} color={COLORS.GREY} />
            <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          </View>
          <Text style={styles.sectionDescription}>{t('settings.chooseLanguage')}</Text>
          <LanguageSwitcher />
        </View>

        <View style={styles.logoutContainer}>
          <Text style={styles.logoutTitle}>{t('settings.quit')}</Text>
          <Text style={styles.sectionDescription}>{t('settings.actionQuit')}</Text>
          <ButtonQuit onPress={handleLogout} />
        </View>
      </View>
    </AnimatedView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: LAYOUT.ALIGN.CENTER,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.GREY,
    marginTop: 8,
    textAlign: LAYOUT.ALIGN.CENTER,
    maxWidth: 300,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: LAYOUT.ALIGN.CENTER,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.GREY,
    marginBottom: 20,
    lineHeight: 20,
  },
  logoutContainer: {
    alignItems: LAYOUT.ALIGN.CENTER,
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  logoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
})
