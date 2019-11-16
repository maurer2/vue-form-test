<template>
  <form class="form" action="/" method="post">
    <slot />
    <button class="button" type="button" @click="handleClick">
      Add
    </button>
  </form>
</template>

<script>
import { Vue } from 'vue-property-decorator';

export default class Form extends Vue {
  handleClick() {
    console.log('handleClick', this);
  }
}
</script>

<style scoped lang="scss">
.form {
  position: relative;
  padding: 0;
}

// .button {}

</style>
