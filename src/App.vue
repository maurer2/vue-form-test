<template>
  <div id="container" class="container">
    <Form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form from '@/components/Form/Form.vue';
// import Summary from '@/components/Summary/Summary.vue';

@Component({
  components: {
    Form,
    // Summary,
  },
})
export default class App extends Vue {
  
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
