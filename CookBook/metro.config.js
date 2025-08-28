import { getSentryExpoConfig } from '@sentry/react-native/metro'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = getSentryExpoConfig(__dirname)

export default config
