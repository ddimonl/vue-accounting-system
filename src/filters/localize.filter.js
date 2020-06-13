import store from '../store'
import ru from '../locales/ru'
import en from '../locales/en'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    console.log(store.getters.info.locale);
    const locale = store.getters.info.locale || 'ru-RU';

    return locales[locale][key] || `LOCALE ERROR: key ${key} not found`;
}