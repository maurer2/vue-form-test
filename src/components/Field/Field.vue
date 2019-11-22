<template>
  <div class="field">
    <label class="label" :class="{ 'label--is-required': isRequired }" :for="id">
      {{ label }}
    </label>

    <template v-if="type === 'email' || type === 'text'">
      <input
        class="input"
        :name="name"
        :id="id"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
        @input="handleInput"
        @input.once="handleInitalInput"
      >
    </template>

    <template v-if="type === 'textarea'">
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

    <p class="error" v-if="!isValid && userHasInteractedWithForm">
      Please enter a valid value.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { FieldType, InputType } from '../../types';

@Component
export default class Field extends Vue {
  @Prop() private name!: FieldType['name'];
  @Prop() private id!: FieldType['id'];
  @Prop() private label!: FieldType['label'];
  @Prop() private value!: FieldType['value'];
  @Prop() private placeholder!: FieldType['placeholder'];
  @Prop() private isValid!: FieldType['isValid'];
  @Prop() private isRequired!: FieldType['isRequired'];
  @Prop() private type!: FieldType['type'];

  private userHasInteractedWithForm: boolean = false;

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

  handleInitalInput(): void {
    this.userHasInteractedWithForm = true;
  }

  @Watch('value')
  handleValueChange(newValue: string): void {
    const { id, type, isValid: oldIsValid } = this;
    const eventName: string = 'isValidChange';

    if (type === InputType.Textarea) {
      return;
    }

    const newIsValid = (type === InputType.Text)
      ? this.isValidTextField(newValue)
      : this.isValidEmailField(newValue);

    if (newIsValid !== oldIsValid) {
      this.$emit(eventName, newIsValid, id);
    }
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

.input,
.textarea {
  flex-grow: 1;
}

.error {
  margin: 0.5rem 0;
  flex-grow: 1;
  color: $orange;
}
</style>
