import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'DSN',
  enableInExpoDevelopment: true,
  debug: true,
})
