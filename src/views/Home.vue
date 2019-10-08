<template>
  <div class="main container">
    <div class="overflow-auto">
      <h4>{{ title }}</h4>
      <br />
      <b-table striped hover :busy.sync="isBusy" :items="items" :fields="fields" caption-top>
        <template v-slot:table-busy>
          <div class="text-center my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>{{ loadingMessage }}</strong>
          </div>
        </template>
        <template v-slot:cell(entity_title)="data">
          <a :href="data.item.source">{{ data.item.entity_title }}</a>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Book {
  entity_title: string;
  identifier: string;
  image: string;
  source: string;
}

interface Field {
  key: string;
  label: string;
}

const { log } = console;

@Component({
  components: {},
})
export default class Home extends Vue {
  title: string = 'List of books';

  loadingMessage: string = 'Loading books...';

  currentPage: number = 1;

  rows: number = 0;

  start: number = 0;

  limit: number = 25;

  isBusy: boolean = true;

  items: Array<any> = [];

  iiifEndpoint: string = 'http://localhost:3000';

  fields: Array<Field> = [
    {
      key: 'entity_title',
      label: 'Title',
    },
    {
      key: 'identifier',
      label: 'Identifier',
    },
    {
      key: 'source',
      label: 'Path',
    },
  ];

  private mounted(): void {
    this.fetchBooks();
  }

  private fetchBooks(): void {
    this.isBusy = true;
    this.start = this.currentPage * this.limit;
    this.items = [];
    fetch(`${this.iiifEndpoint}/listBooks?start=${this.start}&limit=${this.limit}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        this.rows = parseInt(data.length, 10);
        data.documents.map((book: Book) => {
          const { identifier } = book;
          book.source = `/books/${identifier}/1`;
          return this.items.push(book);
        });
      })
      .finally(() => {
        this.isBusy = false;
      })
      .catch((error) => {
        log(`Error! Could not reach the API. ${error}`);
      });
  }
}
</script>
