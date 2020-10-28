<template>
  <div id="page" class="page" v-bind:class="{ pagemetaHidden: !isMetadataInfoPaneVisible }">
    <div id="navbar" class="pane navbar" role="navigation">
      <ul class="navbar navbar-left">
        <li class="navbar-item">
          <a id="buttonLibraryHome" @click.stop.prevent="goToLibraryHome" class="button home">
            <span>{{ $t('message.library') }}</span>
          </a>
        </li>
        <li class="navbar-item">
          <a
            id="buttonMetadata"
            @click.stop.prevent="toggleMetadataInfoPane"
            class="button metadata"
            v-bind:class="{ on: isMetadataInfoPaneVisible }"
          >
            <span>{{ $t('message.metadata') }}</span>
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
            <span>{{ $t('message.toggleBetweenSingleOrDoublePage') }}</span>
          </a>
        </li>
        <li class="navbar-item">
          <a
            id="buttonBrowsePages"
            :title="$t('message.selectPage')"
            class="button thumbnails off"
            @click.stop.prevent="toggleThumbnailsPane"
          >
            <span>{{ $t('message.page') }}</span>
          </a>
        </li>
        <li class="navbar-item">
          <a
            id="buttonRotate"
            :title="$t('message.rotatePage')"
            class="rotate"
            @click.stop.prevent="rotateWorld"
          >
            <span>{{ $t('message.rotatePage') }}</span>
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
            <span>{{ $t('message.toggleFullscreen') }}</span>
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
          <div class="lang-options" v-if="availableLanguages.length > 1">
            <span>{{ $t('message.availableLanguages') }}:</span>
            <select
              class="language"
              :aria-label="$t('message.chooseLanguageForMetadata')"
              @change.stop.prevent="languageChange"
            >
              <option
                v-for="language in availableLanguages"
                :key="language.language"
                :title="language.native"
                class="language"
                :class="language.language"
                :value="language.language"
                :selected="language.default"
              >{{ language.native }}</option>
            </select>
          </div>

          <!-- Choose Volume -->
          <div class="volume-options" v-if="isMultivolume">
            <select class="multivolume" @change.stop.prevent="volumeChange">
              <option value="0" selected>- {{ $t('message.viewRelatedTitles') }} -</option>
              <option
                v-for="volume in metadata.volumes"
                :key="volume.identifier"
                :value="volume.identifier"
              >{{ volume.title }}</option>
            </select>
          </div>

          <div class="group-title">
            <!-- Field: Title -->
            <div class="field field-name-title" :dir="languageDir">
              <div class="field-items" :dir="languageDir">
                <div class="field-item even" :dir="languageDir">
                  <h2 class="field-title" :dir="languageDir">{{ title }}</h2>
                </div>
              </div>
            </div>
            <!-- Field: Sub-title -->
            <div class="field field-subtitle" :dir="languageDir">
              <div class="field-items">
                <div class="field-item">{{ metadata.subtitle.value }}</div>
              </div>
            </div>
          </div>

          <!-- Field: PDF -->
          <div class="field field-pdf" :dir="languageDir">
            <div class="field-label">{{ $t('message.download') }}: &nbsp;</div>
            <div class="field-items">
              <div class="field-item">
                <a :href="metadata.pdf_file.value.hi.uri">
                  <span class="icon" aria-hidden="true" role="presentation">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      fill="#9f2226"
                      width="14"
                      height="17"
                      viewBox="0 0 30 40"
                      style="enable-background:new 0 0 30 40;"
                      xml:space="preserve"
                    >
                      <path
                        d="M14.2,20c-0.4-1.2-0.4-3.7-0.2-3.7C14.7,16.3,14.6,19.2,14.2,20z M14.1,23.7c-0.6,1.6-1.4,3.4-2.2,4.9 c1.4-0.5,3-1.3,4.9-1.7C15.8,26.1,14.8,25.1,14.1,23.7L14.1,23.7z M6.7,33.4c0,0.1,1-0.4,2.7-3.1C8.9,30.8,7.2,32.2,6.7,33.4z M19.4,12.5H30v25.6c0,1-0.8,1.9-1.9,1.9H1.9c-1,0-1.9-0.8-1.9-1.9V1.9C0,0.8,0.8,0,1.9,0h15.6v10.6C17.5,11.7,18.3,12.5,19.4,12.5z M18.8,25.9c-1.6-1-2.6-2.3-3.3-4.2c0.4-1.4,0.9-3.6,0.5-5c-0.4-2.3-3.3-2.1-3.7-0.5c-0.4,1.4,0,3.4,0.6,6c-0.9,2.2-2.2,5-3.2,6.7 c0,0,0,0,0,0c-2.1,1.1-5.7,3.5-4.3,5.3C5.8,34.8,6.6,35,7,35c1.4,0,2.8-1.4,4.8-4.8c2-0.7,4.2-1.5,6.2-1.8c1.7,0.9,3.7,1.5,5,1.5 c2.3,0,2.4-2.5,1.5-3.4C23.4,25.4,20.3,25.7,18.8,25.9z M29.5,8.2l-7.7-7.7C21.4,0.2,21,0,20.5,0H20v10h10V9.5 C30,9,29.8,8.6,29.5,8.2z M23.7,28.1c0.3-0.2-0.2-0.9-3.3-0.7C23.2,28.7,23.7,28.1,23.7,28.1z"
                      />
                    </svg>
                  </span>
                  {{ metadata.pdf_file.value.hi.label }} PDF
                  <span
                    v-if="metadata.pdf_file.value.hi.searchable"
                    class="is-searchable"
                    dir="ltr"
                  >(searchable)</span>
                </a>
              </div>
              <div class="field-item">
                <a :href="metadata.pdf_file.value.lo.uri">
                  <span class="icon" aria-hidden="true" role="presentation">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      fill="#9f2226"
                      width="14"
                      height="17"
                      viewBox="0 0 30 40"
                      style="enable-background:new 0 0 30 40;"
                      xml:space="preserve"
                    >
                      <path
                        d="M14.2,20c-0.4-1.2-0.4-3.7-0.2-3.7C14.7,16.3,14.6,19.2,14.2,20z M14.1,23.7c-0.6,1.6-1.4,3.4-2.2,4.9 c1.4-0.5,3-1.3,4.9-1.7C15.8,26.1,14.8,25.1,14.1,23.7L14.1,23.7z M6.7,33.4c0,0.1,1-0.4,2.7-3.1C8.9,30.8,7.2,32.2,6.7,33.4z M19.4,12.5H30v25.6c0,1-0.8,1.9-1.9,1.9H1.9c-1,0-1.9-0.8-1.9-1.9V1.9C0,0.8,0.8,0,1.9,0h15.6v10.6C17.5,11.7,18.3,12.5,19.4,12.5z M18.8,25.9c-1.6-1-2.6-2.3-3.3-4.2c0.4-1.4,0.9-3.6,0.5-5c-0.4-2.3-3.3-2.1-3.7-0.5c-0.4,1.4,0,3.4,0.6,6c-0.9,2.2-2.2,5-3.2,6.7 c0,0,0,0,0,0c-2.1,1.1-5.7,3.5-4.3,5.3C5.8,34.8,6.6,35,7,35c1.4,0,2.8-1.4,4.8-4.8c2-0.7,4.2-1.5,6.2-1.8c1.7,0.9,3.7,1.5,5,1.5 c2.3,0,2.4-2.5,1.5-3.4C23.4,25.4,20.3,25.7,18.8,25.9z M29.5,8.2l-7.7-7.7C21.4,0.2,21,0,20.5,0H20v10h10V9.5 C30,9,29.8,8.6,29.5,8.2z M23.7,28.1c0.3-0.2-0.2-0.9-3.3-0.7C23.2,28.7,23.7,28.1,23.7,28.1z"
                      />
                    </svg>
                  </span>
                  {{ metadata.pdf_file.value.lo.label }} PDF
                  <span
                    v-if="metadata.pdf_file.value.lo.searchable"
                    class="is-searchable"
                    dir="ltr"
                  >(searchable)</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Field: Author/Contributor -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-author">{{ $t('message.authorContributor') }}: &nbsp;</div>
            <div class="field-items" v-for="value in metadata.author.value" :key="value">
              <div class="field-item">&#8226; {{ value }}</div>
            </div>
          </div>

          <!-- Field: Place of Publication -->
          <div class="field" :dir="languageDir">
            <div
              class="field-label field-publication-location"
            >{{ $t('message.publicationLocation') }}: &nbsp;</div>
            <div class="field-items">
              <div class="field-item">{{ metadata.publication_location.value }}</div>
            </div>
          </div>

          <!-- Field: Publisher -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-publisher">{{ $t('message.publisher') }}: &nbsp;</div>
            <div class="field-items" v-for="value in metadata.publisher.value" :key="value">
              <div class="field-item">{{ value }}</div>
            </div>
          </div>

          <!-- Field: Series -->
          <div class="field" :dir="languageDir" v-if="isSeries">
            <div class="field-label field-series">{{ $t('message.series') }}: &nbsp;</div>
            <div class="field-items" v-for="series in metadata.series" :key="series.identifier">
              <div class="field-item">{{ series.title }}</div>
            </div>
          </div>

          <!-- Field: Date of Publication -->
          <div class="field" :dir="languageDir">
            <div
              class="field-label field-date-publication"
            >{{ $t('message.dateOfPublication') }}: &nbsp;</div>
            <div class="field-items">
              <div class="field-item">{{ metadata.publication_date_text.value }}</div>
            </div>
          </div>

          <!-- Field: Subject -->
          <div class="field field-subject" :dir="languageDir">
            <div class="field-label">{{ $t('message.subject') }}: &nbsp;</div>
            <div class="field-items" v-for="value in metadata.subject.value" :key="value.uuid">
              <div class="field-item" :data-uuid="value.uuid">{{ value.name }}</div>
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
                v-bind:data-partner="value.partner.name"
                v-bind:data-partnerIdentifier="value.partner.identifier"
                v-bind:data-partnerCode="value.partner.code"
              >{{ value.name }}</div>
            </div>
          </div>

          <!-- Field: Language -->
          <div class="field" :dir="languageDir">
            <div class="field-label field-language">{{ $t('message.language') }}&nbsp;</div>
            <div class="field-items">
              <div class="field-item">{{ metadata.language.value }}</div>
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
              >{{ value.name }}</div>
            </div>
          </div>

          <!-- Field: Permanent link -->
          <div class="field field-handle" :dir="languageDir">
            <div class="field-label">{{ $t('message.permanentLink') }}:&nbsp;</div>
            <div class="field-items">
              <div class="field-item">
                <a :href="metadata.handle.value">{{ metadata.handle.value }}</a>
              </div>
            </div>
          </div>

          <b-modal id="modal-xl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!</b-modal>

          <!-- Field: Rights -->
          <div class="field field-rights" :dir="languageDir">
            <div class="field-label element-invisible">{{ $t('message.rights') }}:&nbsp;</div>
            <div class="field-items">
              <div class="field-item">{{ metadata.rights.value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div role="presentation" aria-hidden="true" id="display" class="pane display">
        <div class="openseadragon" :id="viewer.options.id"></div>

        <a
          :title="$t('message.goToPreviousPage')"
          @click.stop.prevent="openPreviousPage"
          id="buttonPreviousPage"
          class="paging previous"
          v-bind:class="{
            active: sequence > 1,
            inactive: sequence <= 1,
            'pager-left': worldDirection === 'ltr' ? true : false,
            'pager-right': worldDirection === 'rtl' ? true : false,
          }"
        >
          <span>{{ $t('message.goToPreviousPage') }}</span>
        </a>
        <a
          :title="$t('message.goToNextPage')"
          @click.stop.prevent="openNextPage"
          id="buttonNextPage"
          class="paging next"
          v-bind:class="{
            active: sequence >= sequenceCount,
            inactive: sequence >= sequenceCount,
            'pager-left': worldDirection === 'ltr' ? false : true,
            'pager-right': worldDirection === 'rtl' ? false : true,
          }"
        >
          <span>{{ $t('message.goToNextPage') }}</span>
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
          :aria-label="$t('message.pageToJumpTo')"
          :dir="worldDirection"
        >
          <span role="navigation">
            <form>
              <b-form-input
                id="slider_value"
                v-model="sequence"
                type="number"
                aria-label="$t('message.pageToJumpTo')"
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

    <b-tooltip
      :title="`${$t('message.browseToPage')} ${sequence + 1}`"
      target="buttonNextPage"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip
      :title="`${$t('message.browseToPage')} ${sequence - 1}`"
      target="buttonPreviousPage"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip :title="$t('message.rotatePage')" target="buttonRotate" triggers="hover"></b-tooltip>

    <b-tooltip
      :title="
        `${$t('message.switchTo')} ${
          isSequenceMode ? $t('message.singlePageMode') : $t('message.doublePageMode')
        }`
      "
      target="buttonViewMode"
      triggers="hover"
    ></b-tooltip>

    <b-tooltip :title="$t('message.goToLibrary')" target="buttonLibraryHome" triggers="hover"></b-tooltip>

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
      v-if="show"
      :title="`${$t('message.selectPage')} ${sequence}`"
      target="slider"
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

<style src="@/sass/style.scss" lang="scss"></style>

<script>
// https://github.com/Islandora/islandora_openseadragon/blob/7.x/js/djtilesource.js
// https://openseadragon.github.io/docs/openseadragon.js.html#line11626
// https://github.com/Islandora/islandora_openseadragon/blob/7.x/includes/utilities.inc
// https://picturae.github.io/openseadragonselection/
import { Component, Watch, Vue } from 'vue-property-decorator'
import OpenSeadragon from 'openseadragon'
import { DjatokaTileSourcePlugIn } from '../assets/js/djtilesource'

DjatokaTileSourcePlugIn(OpenSeadragon)

export default @Component({
  components: {}
})
class DLTSViewer extends Vue {
  loadingMessage = 'Loading resource...'

  metadataEndpoint = process.env.VUE_APP_METADATAENDPOINT // 'http://stage-sites.dlib.nyu.edu/viewer/api/v1'

  viewerEndpoint = process.env.VUE_APP_VIEWERENDPOINT // 'http://stage-sites.dlib.nyu.edu/viewer/api/v1'

  iiifEndpoint = process.env.VUE_APP_IIFENDPOINT // 'http://stage-sites.dlib.nyu.edu/viewer/iiif/2'

  title = ''

  show = false

  identifier = ''

  partner = ''

  collection = ''

  type = ''

  languageDir = 'ltr'

  language = 'en'

  worldDirection = 'ltr'

  sequence = 1

  previousPage = (this.sequence > 1) ? this.sequence - 1 : 1

  nextPage = this.sequence + 1

  isBusy = true

  isFullScreen = false

  isMetadataInfoPaneVisible = true

  isSequenceMode = false

  isMultivolume = false

  isSeries = false

  sequenceCount = 0

  degree = 0

  availableLanguages = []

  metadata = {
    author: {
      label: '',
      value: []
    },
    publication_location: {
      label: '',
      value: []
    },
    publisher: {
      label: '',
      value: []
    },
    publication_date_text: {
      label: '',
      value: []
    },
    collection: {
      label: '',
      value: []
    },
    language: {
      label: '',
      value: []
    },
    subject: {
      label: '',
      value: [
        {
          uuid: '',
          name: ''
        }
      ]
    },
    partner: {
      label: '',
      value: []
    },
    handle: {
      label: '',
      value: []
    },
    pdf_file: {
      label: '',
      value: {
        hi: {},
        lo: {}
      }
    },
    rights: {
      label: '',
      value: []
    },
    subtitle: {
      label: '',
      value: []
    },
    volume: [
      {
        label: '',
        value: [
          {
            identifier: '',
            title: ''
          }
        ]
      }
    ],
    series: [
      {
        title: '',
        isPartOf: {
          title: '',
          identifier: ''
        }
      }
    ]
  }

  map = {}

  // https://openseadragon.github.io/docs/OpenSeadragon.html#.Options
  defaultOptions = {
    id: 'image-viewer',
    crossOriginPolicy: false,
    immediateRender: false, // It is recommended to change setting to true for mobile devices.
    ajaxWithCredentials: false,
    preserveImageSizeOnResize: true,
    preserveViewport: true,
    collectionMode: false,
    visibilityRatio: 1,
    minZoomLevel: 0,
    blendTime: 0,
    alwaysBlend: false,
    inmediateRender: false,
    opacity: 1,
    defaultZoomLevel: 0,
    compositeOperation: 'source-over',
    showNavigator: false,
    homeFillsViewer: false,
    preload: false,
    showFullPageControl: false,
    showZoomControl: false,
    showHomeControl: false,
    constrainDuringPan: false,
    useCanvas: true,
    flipped: false,
    maxImageCacheCount: 200,
    imageSmoothingEnabled: true,
    // placeholderFillStyle: '#ccc',
    showReferenceStrip: false,
    showSequenceControl: false,
    viewportMargins: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    },
    gestureSettingsMouse: {
      clickToZoom: false
    }
  }

  viewer = {
    options: this.defaultOptions
  }

  mounted () {
    this.identifier = this.$route.params.identifier
    this.partner = this.$route.params.partner
    this.collection = this.$route.params.collection
    this.sequence = parseInt(this.$route.params.sequence, 10)
    this.type = this.$route.params.resource
    this.fetchData()
  }

  @Watch('isSequenceMode')
  onPropertyIsSequenceModeChanged (newVal, oldValue) {
    this.changePage()
  }

  volumeChange (event) {
    const element = event.target
    if (element.value !== this.identifier) {
      this.isBusy = true
      this.$router.push({
        path: `/${this.type}/${element.value}/1`
      })
    }
  }

  goToLibraryHome () {
    const path = '/'
    this.isBusy = true
    this.$router.push({ path: path })
  }

  initViewer () {
    const { sequence, type, identifier } = this
    fetch(`${this.metadataEndpoint}/${type}/${identifier}/${sequence}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        this.viewer.options.tileSources = [
          {
            identifier: data.identifier,
            width: data.width,
            height: data.height,
            levels: data.levels,
            dwtLevels: data.dwtLevels,
            compositingLayerCount: data.compositingLayerCount
          }
        ]

        this.map = new OpenSeadragon.Viewer(this.viewer.options)

        this.map.world.addHandler('add-item', (event) => {
          const tiledImage = event.item
          tiledImage.addHandler('fully-loaded-change', () => {
            this.isBusy = false
            this.show = true
          })
        })
      })
  }

  updateMetadataPane (language = 'en') {
    this.isBusy = true
    fetch(`${this.metadataEndpoint}/${this.type}/${this.identifier}?lang=${language}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        const htmlTag = document.querySelector('html')
        this.languageDir = data.requestedLanguage.direction
        Object.keys(data.metadata).forEach((key) => {
          this.metadata[key] = data.metadata[key]
        })
        htmlTag.setAttribute('dir', data.availableLanguages[language].direction)
      })
      .finally(() => {
        this.isBusy = false
      })
  }

  fetchData (language = 'en') {
    this.isBusy = true
    fetch(`${this.metadataEndpoint}/${this.type}/${this.identifier}?lang=${language}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        const htmlTag = document.querySelector('html')
        this.sequenceCount = parseInt(data.metadata.sequence_count.value, 10)
        this.title = data.title
        document.title = data.title
        this.worldDirection = data.worldDirection
        this.isMultivolume = data.isMultivolume
        this.isSeries = data.isSeries
        Object.keys(data.availableLanguages).map(language => {
          this.availableLanguages.push(data.availableLanguages[language])
        })
        Object.keys(data.metadata).forEach((key) => {
          this.metadata[key] = data.metadata[key]
        })
        htmlTag.setAttribute('dir', data.availableLanguages[language].direction)
        this.initViewer()
      })
  }

  isMinZoom () {
    return this.map.viewport.getZoom() <= this.map.viewport.getMinZoom()
  }

  isMaxZoom () {
    return this.map.viewport.getZoom() >= this.map.viewport.getMaxZoom()
  }

  onSliderChange (sequence) {
    this.sequence = parseInt(sequence, 10)
    this.changePage()
  }

  changePage () {
    const {
      type,
      sequence,
      identifier
    } = this
    this.isBusy = true
    this.$router.push({
      path: `/${type}/${identifier}/${sequence}`
    }, () => {
      fetch(`${this.metadataEndpoint}/${type}/${identifier}/${sequence}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          this.map.open([
            {
              tileSource: {
                identifier: data.identifier,
                width: data.width,
                height: data.height,
                levels: data.levels,
                dwtLevels: data.dwtLevels,
                compositingLayerCount: data.compositingLayerCount
              }
            }
          ])
        })
    })
  }

  toggleMetadataInfoPane () {
    this.isMetadataInfoPaneVisible = !this.isMetadataInfoPaneVisible
  }

  rotateWorld () {
    this.degree = (this.map.viewport.getRotation() + 90) % 360
    this.map.viewport.setRotation(this.degree)
  }

  toggleFullscreen () {
    if (!OpenSeadragon.fullScreenApi.isFullScreen()) {
      OpenSeadragon.fullScreenApi.requestFullScreen()
      this.isFullScreen = true
    } else {
      OpenSeadragon.fullScreenApi.exitFullScreen()
      this.isFullScreen = false
    }
  }

  openPreviousPage () {
    if (this.sequence > 1) {
      this.sequence = this.sequence - 1
      this.changePage()
    }
  }

  openNextPage () {
    if (this.sequence < this.sequenceCount) {
      this.sequence = this.sequence + 1
      this.changePage()
    }
  }

  togglePageView () {
    this.isSequenceMode = !this.isSequenceMode
  }

  toggleThumbnailsPane () {
    this.$root.$emit('tv::open::modal', {
      sequence: this.sequence,
      map: this.map,
      title: this.title,
      identifier: this.identifier,
      iiifEndpoint: this.viewerEndpoint,
      viewerEndpoint: this.iiifEndpoint
    })
  }

  areAllFullyLoaded () {
    const count = this.map.world.getItemCount()
    for (let i = 0; i < count; i += 1) {
      const tiledImage = this.map.world.getItemAt(i)
      if (!tiledImage.getFullyLoaded()) {
        return false
      }
    }
    return true
  }

  languageChange (event) {
    this.updateMetadataPane(event.currentTarget.value)
  }
}
</script>
