<template>
  <div class="field" :class="{ 'field--is-invalid': !isValid }">
    <label class="label" :for="name">
      {{ label }}
    </label>
    <input
      class="field"
      type="text"
      placeholder="Enter value"
      :name="name"
      :id="id"
      :value="value"
      @input="handleInput"
    >
    <p class="error" v-if="!isValid">
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
  @Prop() private id!: string;
  @Prop() private label!: string;
  @Prop() private value!: string;
  @Prop() private isValid!: boolean;
  @Prop() private type!: 'text' | 'email';

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
    const { id, type } = this;
    const eventName: string = 'isValidChange';

    if (type === 'text') {
      const newIsValid = Field.isValidTextField(newValue);

      this.$emit(eventName, newIsValid, id);
    }

    if (type === 'email') {
      const newIsValid = Field.isValidEmailField(newValue);

      this.$emit(eventName, newIsValid, id);
    }
  }
}
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
