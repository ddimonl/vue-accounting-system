import localizeFIlter from '@/filters/localize.filter'
import Vue from 'vue'

export default {
    install() {
        Vue.prototype.$title = function (titleKey) {
            const appName = process.env.VUE_APP_TITLE
            return `${localizeFIlter(titleKey)} | ${appName}`
        }
    }
}