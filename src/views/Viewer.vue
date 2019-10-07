<template>
  <div id="page" class="page" v-bind:class="{ pagemetaHidden: !isMetadataInfoPaneVisible }">
    <div id="navbar" class="pane navbar" role="navigation">
        <ul class="navbar navbar-left">
          <li class="navbar-item">
            <a 
              id="buttonLibraryHome" 
              @click.stop.prevent="goToLibraryHome" 
              class="button home">
              <span>{{$t('message.library')}}</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              id="buttonMetadata"
              @click.stop.prevent="toggleMetadataInfoPane"
              class="button metadata"
              v-bind:class="{ on: isMetadataInfoPaneVisible }"
            >
              <span>{{$t('message.metadata')}}</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              id="buttonViewMode"
              @click.stop.prevent="togglePageView"
              :title="$t('message.toggleBetweenSingleOrDoublePage')"
              class="paging toggle active page-double"
              v-bind:class="{ 'page-double': !isSequenceMode, 'page-single': isSequenceMode }"
            >
              <span>{{$t('message.toggleBetweenSingleOrDoublePage')}}</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              id="buttonBrowsePages"
              :title="$t('message.selectPage')"
              class="button thumbnails off"
              @click.stop.prevent="toggleThumbnailsPane"
            >
              <span>{{$t('message.page')}}</span>
            </a>
          </li>
          <li class="navbar-item">
            <a
              id="buttonRotate"
              :title="$t('message.rotatePage')"
              class="rotate"
              @click.stop.prevent="rotateWorld"
            >
              <span>{{$t('message.rotatePage')}}</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-fullscreen">
          <li class="navbar-item">
            <a
              id="buttonToogleFullscreenMode"
              @click.stop.prevent="toggleFullscreen"
              class="button fullscreen"
              v-bind:class="{ on: isFullScreen }"
            >
              <span>{{$t('message.toggleFullscreen')}}</span>
            </a>
          </li>
        </ul>
    </div>
    <div role="main" id="main" class="pane main" :dir="languageDir">
      <div
        id="pagemeta"
        class="pane pagemeta"
        v-bind:class="{ hidden: !isMetadataInfoPaneVisible }"
      >
        <div class="container">
          <!-- Choose language -->
          <div class="lang-options">
            <span>{{ $t('message.availableLanguages') }}: </span>
            <select
              class="language"
              :aria-label="$t('message.chooseLanguageForMetadata')"
              @change.stop.prevent="languageChange"
            >
              <option
                v-for="language in availableLanguages"
                :key="language.code"
                :title="language.label"
                class="language"
                :class="language.code"
                :value="language.code"
                :selected="language.default"
                >{{ language.label }}</option
              >
            </select>
          </div>

          <!-- Choose Volume -->
          <div class="lang-options" v-if="isMultivolume">
            <select class="multivolume" @change.stop.prevent="volumeChange">
              <option value="0" selected>{{ $t('message.viewRelatedTitles') }}</option>
              <option v-for="volume in metadata.volumes" :key="volume.bid" :value="volume.bid"
                >{{ volume.title }} {{ volume.volume_number_str }}</option
              >
            </select>
          </div>

          <!-- Field: Title -->
          <div class="field field-name-title" :dir="languageDir">
            <div class="field-items" :dir="languageDir">
              <div class="field-item even" :dir="languageDir">
                <h2 :dir="languageDir">{{ title }}</h2>
              </div>
            </div>
          </div>

          <!-- Field: Author/Contributor -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-author">
              {{ $t('message.authorContributor') }}: &nbsp;
            </div>
            <div class="field-items" v-for="value in metadata.author.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Place of Publication -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-publication-location">
              {{ $t('message.publicationLocation') }}: &nbsp;
            </div>
            <div
              class="field-items"
              v-for="value in metadata.publication_location.value"
              :key="value"
            >
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Publisher -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-publisher">{{ $t('message.publisher') }}: &nbsp;</div>
            <div class="field-items" v-for="value in metadata.publisher.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Date of Publication -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-date-publication">
              {{ $t('message.dateOfPublication') }}: &nbsp;
            </div>
            <div
              class="field-items"
              v-for="value in metadata.publication_date_text.value"
              :key="value"
            >
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Subject -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-subject">{{ $t('message.subject') }}: &nbsp;</div>
            <div class="field-items" v-for="value in metadata.subject.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Collection -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-collection">{{ $t('message.collection') }}: &nbsp;</div>
            <div
              class="field-items"
              v-for="value in metadata.collection.value"
              :key="value.identifier"
            >
              <div
                class="field-item"
                v-bind:data-identifier="value.identifier"
                v-bind:data-code="value.code"
                v-bind:data-partner="value.partner.title"
                v-bind:data-partnerIdentifier="value.partner.identifier"
                v-bind:data-partnerCode="value.partner.code"
              >
                {{ value.title }}
              </div>
            </div>
          </div>

          <!-- Field: Language -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-language">{{ $t('message.language') }}&nbsp;</div>
            <div class="field-items" v-for="value in metadata.language.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Partner -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-partner">{{ $t('message.partner') }}:&nbsp;</div>
            <div
              class="field-items"
              v-for="value in metadata.partner.value"
              :key="value.identifier"
            >
              <div
                class="field-item"
                v-bind:data-identifier="value.identifier"
                v-bind:data-code="value.code"
              >
                {{ value.title }}
              </div>
            </div>
          </div>

          <!-- Field: Permanent link -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-handle">{{ $t('message.permanentLink') }}:&nbsp;</div>
            <div class="field-items" v-for="value in metadata.handle.value" :key="value">
              <div class="field-item">
                <a :href="value">{{ value }}</a>
              </div>
            </div>
          </div>

          <!-- Field: Rights -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-rights">{{ $t('message.rights') }}:&nbsp;</div>
            <div class="field-items" v-for="value in metadata.rights.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div role="presentation" aria-hidden="true" id="display" class="pane display">
        <div class="openseadragon" :id="viewer.options.id"></div>
        <a
          :title="$t('message.goToPreviousPage')"
          id="buttonPreviousPage"
          @click.stop.prevent="openPreviousPage"
          class="paging previous pager-left"
          v-bind:class="{ active: sequence > 1, inactive: sequence <= 1 }"
        >
          <span>{{$t('message.goToPreviousPage')}}</span>
        </a>
        <a
          :title="$t('message.goToNextPage')"
          id="buttonNextPage"
          @click.stop.prevent="openNextPage"
          class="paging next pager-right"
          v-bind:class="{ active: sequence >= sequenceCount, inactive: sequence >= sequenceCount }"
        >
          <span>{{$t('message.goToNextPage')}}</span>
        </a>
      </div>
    </div>

    <transition name="fade">
      <div v-if="show" id="pager" class="pane pager">
        <b-form-input
          id="slider"
          @change="onSliderChange"
          v-model="sequence"
          :min="1"
          :max="sequenceCount"
          type="range"
          aria-label="Page to jump to"
        >
          <span role="navigation">
            <form>
              <b-form-input
                id="slider_value"
                v-model="sequence"
                type="number"
                aria-label="Page to jump to"
              ></b-form-input>
            </form>
            <span>/</span>
            <span class="sequence_count">{{ sequenceCount }}</span>
          </span>
        </b-form-input>
      </div>
    </transition>

    <b-tooltip
      :title="
        `${isMetadataInfoPaneVisible ? $t('message.hide') : $t('message.show')} ${$t(
          'message.metadata',
        ).toLowerCase()}`
      "
      target="buttonMetadata"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip :title="$t('message.rotatePage')" target="buttonRotate" triggers="hover"></b-tooltip>

    <b-tooltip
      :title="$t('message.browseToPage')"
      target="buttonBrowsePages"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="
        `${isFullScreen ? $t('message.exit') : $t('message.enter')} ${$t(
          'message.fullscreenMode',
        ).toLowerCase()}`
      "
      target="buttonToogleFullscreenMode"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="
        `${$t('message.switchTo')} ${
          isSequenceMode ? $t('message.singlePageMode') : $t('message.doublePageMode')
        }`
      "
      target="buttonViewMode"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="`${$t('message.browseToPage')} ${sequence + 1}`"
      target="buttonNextPage"
      triggers="hover"
    >
    </b-tooltip>

    <b-tooltip
      :title="`${$t('message.browseToPage')} ${sequence - 1}`"
      target="buttonPreviousPage"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="`${$t('message.selectPage')} ${sequence}`"
      target="slider"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="$t('message.goToLibrary')"
      target="buttonLibraryHome"
      triggers="hover"
    ></b-tooltip>

    <div
      v-if="isBusy"
      class="d-flex justify-content-center mb-3"
      style="margin-left: auto; margin-right: auto; position: absolute; top: 40%; left: 50%; z-index: 99999999999;"
    >
      <b-spinner
        type="grow"
        :label="`${$t('message.loadingPage')} ${sequence} ...`"
        style="width: 10rem; height: 10rem;"
      ></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import * as OpenSeadragon from 'openseadragon';
import { Vue } from 'vue-property-decorator';

export default Vue.extend({
  data() {
    return {
      loadingMessage: 'Loading resource...',
      iiifEndpoint: 'http://localhost:3000',
      title: '',
      show: false,
      identifier: '',
      type: '',
      languageDir: 'ltr',
      previousPage: 0,
      nextPage: 0,
      isBusy: true,
      isFullScreen: false,
      isMetadataInfoPaneVisible: true,
      isSequenceMode: false,
      isMultivolume: false,
      sequenceCount: 0,
      degree: 0,
      sequence: 1,
      availableLanguages: [],
      metadata: {
        author: {
          value: [],
        },
        publication_location: {
          value: [],
        },
        publisher: {
          value: [],
        },
        publication_date_text: {
          value: [],
        },
        collection: {
          value: [],
        },
        language: {
          value: [],
        },
        subject: {
          value: [],
        },
        partner: {
          value: [],
        },
        handle: {
          value: [],
        },
        pdf: {
          value: [],
        },
        rights: {
          value: [],
        },
        volumes: {
          value: [],
        },
      },
      map: null,
      viewer: {
        options: {
          id: 'image-viewer',
          crossOriginPolicy: 'Anonymous',
          preserveImageSizeOnResize: true,
          preserveViewport: true,
          collectionMode: false,
          visibilityRatio: 1,
          minZoomLevel: 0,
          defaultZoomLevel: 0,
          showNavigator: false,
          homeFillsViewer: false,
          preload: false,
          showFullPageControl: false,
          showZoomControl: false,
          showHomeControl: false,
          constrainDuringPan: false,
          useCanvas: true,
          flipped: false,
          placeholderFillStyle: false,
          showReferenceStrip: false,
          showLastRow: false,
          showSequenceControl: false,
          viewportMargins: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
          },
        },
      },
    };
  },
  mounted(): void {
    this.identifier = this.$route.params.identifier;
    this.sequence = parseInt(this.$route.params.sequence, 10);
    this.type = this.$route.params.resource;
    this.fetchData();
  },
  watch: {
    isSequenceMode() {
      this.changePage();
    },
  },
  methods: {
    volumeChange(event): void {
      const { type, identifier } = this;
      const target = event.currentTarget.value;
      if (identifier !== target) {
        const sequence = '1';
        const path = `/${type}/${target}/${sequence}`;
        this.isBusy = true;
        this.$router.push({ path: path }, (): void => {
          this.$router.go(path);
          this.isBusy = false;
        });
      }
    },
    goToLibraryHome(): void {
      const path = '/';
      this.isBusy = true;
      this.$router.push({ path: path }, (): void => {
        this.$router.go(path);
      });
    },
    initViewer(): void {
      const { sequence, iiifEndpoint, type, identifier } = this;
      this.viewer.options.tileSources = [];
      const tileSources = [`${iiifEndpoint}/${type}/${identifier}/${sequence}/info.json`];
      this.viewer.options.tileSources = tileSources;
      this.map = OpenSeadragon(this.viewer.options);
      this.map.world.addHandler('add-item', (event) => {
        const tiledImage = event.item;
        tiledImage.addHandler('fully-loaded-change', () => {
          if (this.areAllFullyLoaded()) {
            this.isBusy = false;
          }
        });
      });
      // see http://openseadragon.github.io/examples/multi-image/
      this.map.addHandler('open', (event) => {
        if (this.isSequenceMode) {
          this.map.addTiledImage({
            tileSource: `${iiifEndpoint}/${type}/${identifier}/${this.sequence + 1}/info.json`,
            x: new OpenSeadragon.Point(0, 0),
          });
        }
      });
      this.map.gestureSettingsMouse.clickToZoom = false;
      this.show = true;
    },
    updateMetadataPane(language: string = 'en'): void {
      this.isBusy = true;
      const root = this.$root;
      fetch(`${this.iiifEndpoint}/${this.type}/${this.identifier}?language=${language}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          this.languageDir = data.language.dir;
          this.title = data.title;
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    fetchData(language: string = 'en'): void {
      this.isBusy = true;
      fetch(`${this.iiifEndpoint}/${this.type}/${this.identifier}?language=${language}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          this.sequenceCount = parseInt(data.metadata.sequence_count.value[0], 10);
          this.title = data.title;
          document.title = this.title;
          this.isMultivolume = data.isMultivolume;
          Object.keys(data.availableLanguages).map((language) => {
            this.availableLanguages.push(data.availableLanguages[language]);
          });
          Object.keys(data.metadata).forEach((key: string): void => {
            this.metadata[key] = data.metadata[key];
          });
          this.metadata.volumes = data.volumes;
          this.initViewer();
        });
    },
    isMinZoom(): boolean {
      return this.map.viewport.getZoom() <= this.map.viewport.getMinZoom();
    },
    isMaxZoom(): boolean {
      return this.map.viewport.getZoom() >= this.map.viewport.getMaxZoom();
    },
    onSliderChange(): void {
      this.changePage();
    },
    changePage(): void {
      const { type, iiifEndpoint, sequence, identifier } = this;
      this.isBusy = true;
      this.$router.push({ path: `/books/${this.identifier}/${this.sequence}` }, (): void => {
        this.map.open([
          {
            tileSource: `${iiifEndpoint}/${type}/${identifier}/${sequence}/info.json`,
          },
        ]);
      });
    },
    toggleMetadataInfoPane(): void {
      this.isMetadataInfoPaneVisible = !this.isMetadataInfoPaneVisible;
    },
    rotateWorld(): void {
      this.degree = (this.map.viewport.getRotation() + 90) % 360;
      this.map.viewport.setRotation(this.degree);
    },
    toggleFullscreen(): void {
      if (!OpenSeadragon.isFullScreen()) {
        OpenSeadragon.requestFullScreen(document.body);
        this.isFullScreen = true;
      } else {
        OpenSeadragon.exitFullScreen();
        this.isFullScreen = false;
      }
    },
    openPreviousPage(): void {
      if (this.sequence > 1) {
        this.sequence = parseInt(this.sequence, 10) - 1;
        this.changePage();
      }
    },
    openNextPage(): void {
      if (this.sequence < this.sequenceCount) {
        this.sequence = parseInt(this.sequence, 10) + 1;
        this.changePage();
      }
    },
    togglePageView(): void {
      this.isSequenceMode = !this.isSequenceMode;
    },
    toggleThumbnailsPane(): void {
      this.$root.$emit('tv::open::modal', {
        sequence: this.sequence,
        map: this.map,
        title: this.title,
        identifier: this.identifier,
        iiifEndpoint: this.viewerEndpoint,
        viewerEndpoint: this.iiifEndpoint,
      });
    },
    areAllFullyLoaded(): boolean {
      let tiledImage;
      const count = this.map.world.getItemCount();
      for (let i = 0; i < count; i += 1) {
        tiledImage = this.map.world.getItemAt(i);
        if (!tiledImage.getFullyLoaded()) {
          return false;
        }
      }
      return true;
    },
    languageChange(event: any): void {
      this.updateMetadataPane(event.currentTarget.value);
    },
  },
});
</script>

<style src="@/sass/style.scss" lang="scss"></style>
