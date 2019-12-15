<template>
  <form
    class="form"
    action="/"
    method="post"
    autocomplete="off"
    @submit.prevent="handleSubmit"
  >
    <template v-for="field in fields">
      <Field
        :key="field.id"
        :value="field.value"
        :name="field.name"
        :id="field.id"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :is-valid="field.isValid"
        :is-required="field.isRequired"
        v-model.trim="field.value"
        @isValidChange="handleValidChange"
        @inputChange="handleInputChange"
      />
    </template>

    <p class="hint">
      * fields are mandatory
    </p>

    <pre hidden>
      {{ fields }}
    </pre>

    <button class="button" type="submit" :disabled="!isSubmittable">
      Add entry
    </button>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FieldType, FormTransferType } from 'types/types.ts';

import Field from 'components/Field/Field.vue';
import formdata from 'components/Form/formdata.ts';

@Component({
  components: {
    Field,
  },
})
export default class Form extends Vue {
  private fields: FieldType[] = formdata;

  get requiredFields(): FieldType[] {
    const requiredFields = this.fields.filter((field: FieldType) => field.isRequired);

    return requiredFields;
  }

  get isSubmittable(): boolean {
    const requiredFieldsAreValid = this.requiredFields.every((field: FieldType) => field.isValid);

    return requiredFieldsAreValid;
  }

  public get formValues(): FormTransferType {
    const formValues: FormTransferType = this.fields.reduce((total: any, field: FieldType) => {
      const newTotal = total;
      const { value, id: key } = field;

      if (!(key in newTotal)) {
        newTotal[key] = value;
      }

      return newTotal;
    }, {});

    return formValues;
  }

  private handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    this.$emit('addNewEntry', this.formValues);
  }

  private handleValidChange(newIsValid: boolean, id: string): void {
    if (typeof newIsValid !== 'boolean') {
      return;
    }

    const fieldToUpdateIndex: number = this.fields.findIndex((field) => field.id === id);

    if (fieldToUpdateIndex === -1) {
      return;
    }

    const newFields = [...this.fields];
    newFields[fieldToUpdateIndex].isValid = newIsValid;

    this.fields = newFields;
  }

  private handleInputChange(newValue: string, id: string): void {
    if (typeof newValue !== 'string') {
      return;
    }

    const fieldToUpdateIndex: number = this.fields.findIndex((field) => field.id === id);

    if (fieldToUpdateIndex === -1) {
      return;
    }

    const newFields = [...this.fields];
    newFields[fieldToUpdateIndex].value = newValue;

    this.fields = newFields;
  }
}
</script>

<style scoped lang="scss">
.form {
  padding: 0;
  max-width: 30rem;
}

.hint {
  font-style: italic;
}

</style>
