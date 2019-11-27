<template>
  <input
    class="input"
    :name="name"
    :id="id"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :required="isRequired"
    @input="handleInput"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FieldType, InputType } from '@/types';

@Component
export default class InputField extends Vue {
  @Prop() private name!: FieldType['name'];
  @Prop() private id!: FieldType['id'];
  @Prop() private label!: FieldType['label'];
  @Prop() private value!: FieldType['value'];
  @Prop() private placeholder!: FieldType['placeholder'];
  @Prop() private isValid!: FieldType['isValid'];
  @Prop() private isRequired!: FieldType['isRequired'];
  @Prop() private type!: InputType.Text | InputType.Email;

  private isValidTextField(fieldValue: string): boolean {
    return fieldValue.length > 0;
  }

  private isValidEmailField(fieldValue: string): boolean {
    // https://emailregex.com/
    // eslint-disable-next-line
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const isValid = emailRegex.test(fieldValue);

    return isValid;
  }

  @Watch('value')
  private handleValueChange(newValue: string): void {
    const {
      id, type, isValid: oldIsValid,
    } = this;

    const newIsValid = (type === InputType.Text)
      ? this.isValidTextField(newValue)
      : this.isValidEmailField(newValue);

    if (newIsValid !== oldIsValid) {
      this.$emit('validityChange', newIsValid, id);
    }
  }

  private handleInput(event: Event): void {
    const { target } = event;
    const newValue = (target as HTMLInputElement).value;

    this.$emit('inputChange', newValue);
  }
}
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & + & {
    margin-top: 0.5rem;
  }
}

.label {
  margin: 0.5rem 0;
  flex-basis: 10rem;
  flex-grow: 0;
  align-self: baseline;
  font-weight: bold;

  &--is-required:after {
    content: "*";
  }
}

.input {
  flex-grow: 1;
}

.error {
  margin: 0.5rem 0;
  flex-grow: 1;
  color: $orange;
}
</style>
