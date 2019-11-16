<template>
  <div class="field" :class="{ 'field--is-invalid': isInvalid }">
    <label class="label" :for="name">
      {{ label }}
    </label>
    <input
      class="field"
      v-model="value"
      type="text"
      :name="name"
      :id="name"
      placeholder="Placeholder"
      autocomplete="off"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Field extends Vue {
  @Prop() private name!: string;

  @Prop() private label!: string;

  @Prop() private value!: string;

  @Prop({ default: false }) private isInvalid!: boolean;
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
