<template>
  <div class="field">
    <label class="label" :class="{ 'label--is-required': isRequired }" :for="id">
      {{ label }}
    </label>

    <template v-if="type === 'textarea'">
      test
    </template>

    <template v-else>
      <InputField
        class="input"
        v-bind="$props"
        @inputChange="handleInputChange"
        @validityChange="handleValidityChange"
      />
    </template>

    <p class="error" v-if="!isValid">
      Please enter a valid value.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { FieldType } from '@/types';

import InputField from '@/components/InputField/InputField.vue';
import TextareaField from '@/components/TextareaField/TextareaField.vue';

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

  @Emit('isValidChange')
  handleValidityChange(newValue: boolean): void {
    const { id } = this;

    console.log("isValidChange", newValue);

    this.$emit('isValidChange', newValue, id);
  }

  // @Emit('inputChange')
  handleInputChange(value: string): any {
    const { id } = this;

    this.$emit('inputChange', value, id);
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
