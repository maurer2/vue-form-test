<template>
  <article id="container" class="container">
    <header class="header">
      <h1 class="title">
        Sailshorse
      </h1>
      <button
        class="button"
        type="button"
        @click="handleFormVisibilityToggle"
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

  mounted() {
    this.$store.commit('addEntry', {
      firstName: 'Cat',
      lastName: 'Damon',
      email: 'catD@mon.com',
      customerQuery: '',
    });

    this.$store.commit('addEntry', {
      firstName: 'Catrick',
      lastName: 'Swayze',
      email: 'catrick@swayze.com',
      customerQuery: '',
    });
  }

  handleNewEntry(newEntry: { [key: string]: string }): void {
    this.$store.commit('addEntry', newEntry);
    this.formIsVisible = false;
  }

  handleFormVisibilityToggle() {
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

.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
</style>

<style lang="scss" scoped>

</style>
