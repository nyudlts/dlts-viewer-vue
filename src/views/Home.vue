<template>
  <div class="main container">
    <div class="overflow-auto">
      <br />
      <h4>{{ title }}</h4>
      <hr />
      <b-form-group label-cols-sm="0" label-align-sm="left" label-for="filterInput" class="mb-0">
        <h5>Search</h5>
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to search by object identifier"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group
        label-cols-sm="0"
        label-align-sm="left"
        label-size="sm"
        class="mb-0"
      >
        <br>
        <h6>Filter by collection</h6>
        <b-form-select v-model="selectedCollection" :options="collections" @change="onCollectionChange($event)"></b-form-select>
      </b-form-group>
      <br>
      <b-table striped hover :busy.sync="isBusy" :items="items" :fields="fields" caption-top>
        <template v-slot:table-busy>
          <div class="text-center my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>{{ loadingMessage }}</strong>
          </div>
        </template>
        <template v-slot:cell(title)="data">
          <router-link :to="data.item.source">{{ data.item.title }}</router-link>
        </template>
      </b-table>
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="limit"
        aria-controls="items"
        @input="fetchBooks"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
// https://github.com/LinusBorg/portal-vue
import { Component, Watch, Vue } from 'vue-property-decorator'

const { log } = console

export default @Component({
  components: {}
})
class Home extends Vue {
  title = 'List of books'

  loadingMessage = 'Loading books...'

  currentPage = 1

  selectedCollection = 'null'

  rows = 0

  start = 0

  limit = 10

  lang = 'en'

  isBusy = true

  items = []

  filter = ''

  filterOn = []

  sortDirection = 'asc'

  sortBy = 'collection'

  iiifEndpoint = `${process.env.VUE_APP_VIEWERENDPOINT}/books`

  collectionsUrl = `${process.env.VUE_APP_VIEWERENDPOINT}/collections`

  collections = [
    {
      text: '-- All collections --',
      value: 'null'
    }
  ]

  partner = ''

  timeoutID = 0

  collection = ''

  fields = [
    {
      key: 'title',
      label: 'Title'
    },
    {
      label: 'Identifier',
      key: 'identifier'
    }
  ]

  @Watch('filter')
  onPropertyChanged (newVal, oldValue) {
    clearTimeout(this.timeoutID)
    const vm = this
    this.timeoutID = setTimeout(() => {
      vm.fetchBooks()
    }, 500)
  }

  mounted () {
    this.fetchBooks()
    this.fetchCollections()
  }

  onCollectionChange (newValue) {
    let params = []
    this.selectedCollection = newValue
    if (newValue !== 'null') {
      params = newValue.split(':')
      this.collection = params[0]
      if (params[1]) {
        this.partner = params[1]
      }
    }
    this.fetchBooks()
  }

  fetchCollections () {
    fetch(this.collectionsUrl)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((data) => {
        const vm = this
        data.response.docs.map((doc) => {
          vm.collections.push({
            value: `${doc.code}:${doc.partners[0].code}`,
            text: `${doc.title} - ${doc.partners[0].name}`
          })
        })
      })
      .catch((error) => {
        log(`Error! Could not reach the API. ${error}`)
      })
  }

  fetchBooks () {
    this.isBusy = true
    this.start = this.start * this.limit
    this.items = []
    fetch(`${this.iiifEndpoint}?filter=${this.filter}&start=${this.start}&rows=${this.limit}&lang=${this.lang}&collection=${this.collection}&partner=${this.partner}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        const vm = this
        this.rows = parseInt(data.response.numFound, 10)
        data.response.docs.map((doc) => {
          vm.items.push(
            {
              title: doc.title,
              identifier: doc.identifier,
              source: `/books/${doc.identifier}/1`
            }
          )
        })
      })
      .finally(() => {
        this.isBusy = false
      })
      .catch((error) => {
        log(`Error! Could not reach the API. ${error}`)
      })
  }
}
</script>
