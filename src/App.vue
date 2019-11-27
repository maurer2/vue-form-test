<template>
  <div id="container" class="container">
    <header class="header">
      <h1 class="title">
        Sailsphorce
      </h1>
      <div class="buttons">
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
      </div>
    </header>

    <main class="main">
      <section class="section" v-if="formIsVisible">
        <Form @addNewEntry="handleNewEntry" />
      </section>

      <section class="section">
        <Summary />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FormTransferType } from '@/types.ts';
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

  mounted(): void {
    this.$store.commit('addEntry', {
      firstName: 'Cat',
      lastName: 'Damon',
      email: 'catD@mon.com',
      customerQuery: '',
    } as FormTransferType);

    this.$store.commit('addEntry', {
      firstName: 'Catrick',
      lastName: 'Swayze',
      email: 'catrick@swayze.com',
      customerQuery: '',
    } as FormTransferType);
  }

  handleNewEntry(newEntry: FormTransferType): void {
    this.$store.commit('addEntry', newEntry);
    this.formIsVisible = false;
  }

  handleFormVisibilityToggle(): void {
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
  padding: 0;
  color: $foreground;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input {
  padding: 0.5rem 1rem;
  background-color: $white;
  background-image: none;
  border: 1px solid $gray;
  border-radius: 0;
  box-shadow: none;
  outline-color: $orange;
}

textarea {
  padding: 0.5rem 1rem;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: 0;
  box-shadow: none;
  outline-color: $orange;
}

button {
  padding: 0.5rem 1rem;
  appearance: button;
  border: 0;
  border-radius: 20px;
  background: $orange;
  color: $white;
  font-weight: bold;
  outline: 0;
  box-shadow: none;
  cursor: pointer;

  &[disabled] {
    background: $gray;
  }
}

</style>

<style lang="scss" scoped>
.container {
  position: relative; // needed for sticky
}

.header {
  position: sticky;
  top: 0;
  padding: 1rem;
  background: $darkblue;
  color: $white;
}

.main {
  margin-right: auto;
  padding: 1rem;
  max-width: 50rem;
}

.section {
  margin-bottom: 2rem;
}

.title {
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>
