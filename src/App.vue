<template>
  <div id="container" class="container">
    <Header
      :form-is-visible="formIsVisible"
      @toggleFormVisiblity="handleFormVisibilityToggle"
    />
    <Main>
      <template v-slot:form>
        <section class="section">
          <h2 class="subtitle">
            Form
          </h2>
          <transition
            v-if="formIsVisible"
            name="bounce"
            appear
            @enter="handleTransitionEnter"
            @afterEnter="handleTransitionEnterEnd"
            @leave="handleTransitionLeave"
            @afterLeave="handleTransitionLeaveEnd"
          >
            <Form @addNewEntry="handleNewEntry" />
          </transition>
        </section>
      </template>
      <template v-slot:summary>
        <section class="section">
          <Summary />
        </section>
      </template>
    </Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FormTransferType } from '@/types.ts';
import Header from '@/components/Header/Header.vue';
import Main from '@/components/Main/Main.vue';
import Form from '@/components/Form/Form.vue';
import Summary from '@/components/Summary/Summary.vue';

@Component({
  components: {
    Header,
    Main,
    Form,
    Summary,
  },
})
export default class App extends Vue {
  private formIsVisible: boolean = true;
  private formIsTransitioning: boolean = false;

  private created(): void {
    this.addDummyData();
  }

  private handleNewEntry(newEntry: FormTransferType): void {
    this.$store.commit('addEntry', newEntry);
    this.formIsVisible = false;
  }

  private handleFormVisibilityToggle(): void {
    if (this.formIsTransitioning) {
      return;
    }

    this.formIsVisible = !this.formIsVisible;
  }

  private addDummyData(): void {
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

  private handleTransitionEnter(): void {
    this.formIsTransitioning = true;
  }

  private handleTransitionEnterEnd(): void {
    this.formIsTransitioning = false;
  }

  private handleTransitionLeave(): void {
    this.formIsTransitioning = true;
  }

  private handleTransitionLeaveEnd(): void {
    this.formIsTransitioning = false;
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

  &[disabled],
  &--is-disabled {
    background: $gray;
  }
}

</style>

<style lang="scss" scoped>
@import '~animatewithsass/_properties.scss';
@import '~animatewithsass/_bouncing-entrances/bounceInLeft.scss';
@import '~animatewithsass/_bouncing-exits/bounceOutLeft.scss';

.container {
  position: relative;
}

.section {
  margin-bottom: 2rem;
}

.subtitle {
  margin-top: 0;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed $blue;
}

// transitions
.bounce-leave-active {
  @include bounceOutLeft();
}

.bounce-enter-active {
  @include bounceInLeft();
}

</style>
