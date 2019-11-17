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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import { Input } from '@/components/types.ts';

@Component
export default class Field extends Vue {
  @Prop() private name!: string;
  @Prop() private label!: string;
  @Prop() private value!: string;
  @Prop() private type!: 'text' | 'email';

  private isInvalid: boolean = true;

  handleInput(event: Event): void {
    if (!event) {
      return;
    }

    const { target } = event;
    const newValue = (target as HTMLInputElement).value;

    this.$emit('input', newValue);
  }

  static isValidTextField(fieldValue: string): boolean {
    return fieldValue.length > 0;
  }

  static isValidEmailField(fieldValue: string): boolean {
    // https://emailregex.com/
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const isValid = emailRegex.test(fieldValue);

    return isValid;
  }

  @Watch('value')
  onValueChange(newValue: string) {
    let newIsInvalid = this.isInvalid;

    if (this.type === 'text') {
      const validity = Field.isValidTextField(newValue);

      newIsInvalid = !validity;
    }

    if (this.type === 'email') {
      const validity = Field.isValidEmailField(newValue);

      newIsInvalid = !validity;
    }

    this.isInvalid = newIsInvalid;
  }
}
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
