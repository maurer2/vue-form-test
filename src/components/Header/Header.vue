<template>
  <header class="header">
    <h1 class="title">
      Sailsphorce
    </h1>
    <div class="buttons">
      <button
        class="button"
        type="button"
        @click="toggleFormVisibility"
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Header extends Vue {
  @Prop() formIsVisible!: boolean;

  private toggleFormVisibility(): void {
    this.$emit('toggleFormVisiblity');
  }
}
</script>

<style scoped lang="scss">
.header {
  padding: 1rem;
  background: $darkblue;
  color: $white;
}

.title {
  margin-top: 0;
  margin-bottom: 1rem;
}


</style>
