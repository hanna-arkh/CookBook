import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: 'ec6c8670841b11f0a5079a7bf1b0105f',

  enableTracing: true,

  tracesSampleRate: 1.0,
})
