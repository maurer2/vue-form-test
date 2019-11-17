<template>
  <article id="container" class="container">
    <h1>App</h1>

    <section class="section" v-if="showForm">
      <h2>Form</h2>
      <Form @addNewEntry="handleNewEntry" />
    </section>

    <section class="section" v-if="showSummary">
      <h2>Summary</h2>
      {{ entries.length }}
      <Summary />
    </section>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form from '@/components/Form/Form.vue';
import Summary from '@/components/Summary/Summary.vue';

@Component({
  components: {
    Form,
    Summary,
  },
})
export default class App extends Vue {
  private showForm: boolean = true;
  private showSummary: boolean = true;

  get entries() {
    return this.$store.state.entries;
  }

  handleNewEntry(newEntry: { [key: string]: string }): void {
    console.log(newEntry);
    this.$store.commit('addEntry', newEntry);
  }
}
</script>

<style lang="scss">
@import '~normalize.css';

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 16px;
  background: $background;
}

body {
  margin: 0;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style lang="scss" scoped>

</style>
