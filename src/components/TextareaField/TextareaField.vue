<template>
  <textarea
    class="textarea"
    cols="20"
    rows="10"
    :name="name"
    :id="id"
    :value="value"
    :placeholder="placeholder"
    :required="isRequired"
    @input="handleInput"
    @input.once="handleInitalInput"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
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
  private hasBeenInteractedWith: boolean = false;

  private isValidField(fieldValue: string): boolean {
    return fieldValue.length > 0;
  }

  handleInitalInput(): void {
    this.hasBeenInteractedWith = true;
  }

  @Emit('input')
  handleInput(event: Event): string {
    const { target } = event;
    const newValue = (target as HTMLInputElement).value;

    return newValue;
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

.textarea {
  flex-grow: 1;
}

.error {
  margin: 0.5rem 0;
  flex-grow: 1;
  color: $orange;
}
</style>
