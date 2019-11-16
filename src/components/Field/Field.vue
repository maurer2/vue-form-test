<template>
  <div class="field" :class="{ 'field--is-invalid': isInvalid }">
    <label class="label" :for="name">
      {{ label }}
    </label>
    <input
      class="field"
      type="text"
      placeholder="Enter value"
      :name="name"
      :value="value"
      @input="handleInput"
    >
    <p class="error" v-if="isInvalid">
      Field invalid
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { Input } from '@/components/types.ts';

@Component
export default class Field extends Vue {
  @Prop() private name!: string;
  @Prop() private label!: string;
  @Prop() private value!: string;
  @Prop({ default: false }) private isInvalid!: boolean;

  handleInput(event: InputEvent): void {
    if (!event) {
      return;
    }

    const { target } = event;
    const newValue: string = (target as HTMLInputElement).value;

    console.log(newValue);
    this.$emit('input', newValue);
  }
}
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
