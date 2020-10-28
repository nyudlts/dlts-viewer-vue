import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
// import store from './store'
import './registerServiceWorker'
import titleMixin from './mixins/titleMixin'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.mixin(titleMixin)

Vue.use(VueI18n)

Vue.use(BootstrapVue)

const messages = {
  en: {
    message: {
      viewRelatedTitles: 'View Related Titles',
      subject: 'Subject',
      rights: 'Rights',
      permanentLink: 'Permanent Link',
      availableLanguages: 'Available languages',
      authorContributor: 'Author/Contributor',
      publicationLocation: 'Place of Publication',
      publisher: 'Publisher',
      dateOfPublication: 'Date of Publication',
      chooseLanguageForMetadata: 'Choose Language for Metadata',
      language: 'Language',
      partner: 'Provider',
      collection: 'Collection',
      goToPreviousPage: 'Go to previous page',
      goToNextPage: 'Go to next page',
      library: 'Library',
      goToLibrary: 'Go to Library',
      browseToPage: 'Browse to page',
      loadingPage: 'Loading page',
      selectPage: 'Select page',
      metadata: 'Metadata',
      toggleBetweenSingleOrDoublePage: 'Toggle between single or double page',
      pages: 'Pages',
      page: 'Page',
      rotatePage: 'Rotate page',
      toggleFullscreen: 'Toggle fullscreen',
      singlePageMode: 'single page mode',
      doublePageMode: 'double page mode',
      hide: 'Hide',
      show: 'Show',
      exit: 'Exit',
      enter: 'Enter',
      fullscreenMode: 'Fullscreen mode',
      switchTo: 'Switch to',
      pageToJumpTo: 'Page to jump to',
      download: 'Download',
      series: 'Series'
    }
  },
  ar: {
    message: {
      subject: 'الموضوع',
      rights: 'Rights',
      permanentLink: 'الرابط الالكتروني الدائم',
      availableLanguages: 'اللغات المتوفرة',
      authorContributor: 'الكاتب',
      publicationLocation: 'مكان النشر',
      publisher: 'الناشر',
      dateOfPublication: 'تاريخ النشر',
      chooseLanguageForMetadata: 'Choose Language for Metadata',
      language: 'Language',
      partner: 'المزوِّد',
      goToPreviousPage: 'Go to previous page',
      goToNextPage: 'Go to next page',
      library: 'Library',
      goToLibrary: 'Go to Library',
      browseToPage: 'Browse to page',
      loadingPage: 'Loading page',
      selectPage: 'Select page',
      metadata: 'Metadata',
      toggleBetweenSingleOrDoublePage: 'Toggle between single or double page',
      pages: 'Pages',
      page: 'Page',
      rotatePage: 'Rotate page',
      toggleFullscreen: 'Toggle fullscreen',
      singlePageMode: 'single page mode',
      doublePageMode: 'double page mode',
      hide: 'Hide',
      show: 'Show',
      exit: 'Exit',
      enter: 'Enter',
      fullscreenMode: 'Fullscreen mode',
      switchTo: 'Switch to',
      pageToJumpTo: 'Page to jump to',
      download: 'تحميل',
      series: 'Series'
    }
  }
}

const i18n = new VueI18n({ locale: 'en', messages })

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
