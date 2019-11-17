<template>
  <article id="container" class="container">
    <header class="header">
      <h1 class="title">
        Sailshorse
      </h1>
      <button
        class="button"
        type="button"
        @click="handleFormVisbilityToggle"
      >
        <span class="text" v-if="formIsVisible">
          Hide form
        </span>
        <span class="text" v-else>
          Show form
        </span>
      </button>
    </header>

    <section class="section" v-if="formIsVisible">
      <Form @addNewEntry="handleNewEntry" />
    </section>

    <section class="section">
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
  private formIsVisible: boolean = true;

  get entries() {
    return this.$store.state.entries;
  }

  mounted() {
    this.$store.commit('addEntry', {"firstName":"wefwef","lastName":"wfwe@wefew","email":"wfwef@frewfew.de","customerQuery":""});
  }

  handleNewEntry(newEntry: { [key: string]: string }): void {
    this.$store.commit('addEntry', newEntry);
    this.formIsVisible = false;
  }

  handleFormVisbilityToggle() {
    this.formIsVisible = !this.formIsVisible;
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
