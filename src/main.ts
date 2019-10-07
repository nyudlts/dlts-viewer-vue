import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueI18n);

Vue.use(BootstrapVue);

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
    },
  },
  ar: {
    message: {
      subject: 'Subject',
      rights: 'Rights',
      permanentLink: 'Permanent Link',
      availableLanguages: 'اللغات المتوفرة',
      authorContributor: 'Author/Contributor',
      publicationLocation: 'Place of Publication',
      publisher: 'Publisher',
      dateOfPublication: 'Date of Publication',
      chooseLanguageForMetadata: 'Choose Language for Metadata',
      language: 'Language',
      partner: 'Provider',
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
    },
  },
};

const i18n = new VueI18n({ locale: 'en', messages });

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');
