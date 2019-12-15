<template>
  <div class="field">
    <label class="label" :class="{ 'label--is-required': isRequired }" :for="id">
      {{ label }}
    </label>

    <template v-if="type === 'textarea'">
      <TextareaField
        class="field-element"
        v-bind="$props"
        @inputChange="handleInputChange"
        @inputChange.once="handleInitalInputChange"
        @validityChange="handleValidityChange"
      />
    </template>

    <template v-else>
      <InputField
        class="field-element"
        v-bind="$props"
        @inputChange="handleInputChange"
        @inputChange.once="handleInitalInputChange"
        @validityChange="handleValidityChange"
      />
    </template>

    <p class="error" v-if="!isValid && hasBeenInteractedWith">
      Please enter a valid value.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FieldType } from 'types/types.ts';

import InputField from 'components/InputField/InputField.vue';
import TextareaField from 'components/TextareaField/TextareaField.vue';

@Component({
  components: {
    InputField,
    TextareaField,
  },
})
export default class Field extends Vue {
  @Prop() private name!: FieldType['name'];
  @Prop() private id!: FieldType['id'];
  @Prop() private label!: FieldType['label'];
  @Prop() private value!: FieldType['value'];
  @Prop() private placeholder!: FieldType['placeholder'];
  @Prop() private isValid!: FieldType['isValid'];
  @Prop() private isRequired!: FieldType['isRequired'];
  @Prop() private type!: FieldType['type'];

  private hasBeenInteractedWith: boolean = false;

  private handleValidityChange(newValue: boolean): void {
    const { id } = this;

    this.$emit('isValidChange', newValue, id);
  }

  private handleInputChange(value: string): void {
    const { id } = this;

    this.$emit('inputChange', value, id);
  }

  private handleInitalInputChange(): void {
    this.hasBeenInteractedWith = true;
  }
}

</script>

<style scoped lang="scss">
$bp-horizontal: 25rem;
$label-width: 9rem;

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
  flex-basis: 100%;
  flex-grow: 0;
  align-self: baseline;
  font-weight: bold;

  @media only screen and (min-width: $bp-horizontal) {
    flex-basis: $label-width;
  }

  &--is-required:after {
    content: "*";
  }
}

.field-element {
  flex-grow: 1;
}

.error {
  margin: 0.5rem 0;
  flex-grow: 1;
  color: $orange;

  @media only screen and (min-width: $bp-horizontal) {
    margin-left: $label-width;
  }
}
</style>
