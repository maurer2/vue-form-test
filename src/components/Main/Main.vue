<template>
  <main class="main">
    <slot name="form" />
    <slot name="summary" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Main extends Vue {}
</script>

<style scoped lang="scss">
.main {
  margin-right: auto;
  padding: 1rem;
  max-width: 50rem;
}

</style>
