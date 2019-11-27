<template>
  <textarea
    class="textarea"
    cols="20"
    rows="10"
    autocomplete="false"
    :name="name"
    :id="id"
    :value="value"
    :placeholder="placeholder"
    :required="isRequired"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FieldType, InputType } from '@/types';

@Component
export default class TextareaField extends Vue {
  @Prop() private name!: FieldType['name'];
  @Prop() private id!: FieldType['id'];
  @Prop() private label!: FieldType['label'];
  @Prop() private value!: FieldType['value'];
  @Prop() private placeholder!: FieldType['placeholder'];
  @Prop() private isValid!: FieldType['isValid'];
  @Prop() private isRequired!: FieldType['isRequired'];

  private type: InputType = InputType.Textarea;

  private isValidTextareaField(fieldValue: string): boolean {
    return fieldValue.length > 0;
  }

  @Watch('value')
  private handleValueChange(newValue: string): void {
    const { id, isValid: oldIsValid } = this;

    const newIsValid = this.isValidTextareaField(newValue);

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
.textarea {
  resize: vertical;
}
</style>
