import { createI18n } from 'vue-i18n';

/* eslint-disable-next-line import/no-unresolved */
import messages from '@intlify/unplugin-vue-i18n/messages';

/**
 * Helper to test different browser-locales (es-ES, en-GB)
 ***** TODO: remove this in production *****
* */
// Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
//   value() {
//     return { locale: 'en-US' };
//   },
// });
/** ********* */

export const BROWSER_LOCALE = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];

const i18n = createI18n({
  legacy: false,
  locale: BROWSER_LOCALE,
  fallbackLocale: 'ca',
  messages,
});

export default i18n;

export const setLocale = (locale = BROWSER_LOCALE) => {
  i18n.global.locale.value = locale;
};
