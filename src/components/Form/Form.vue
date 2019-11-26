<template>
  <div class="wrapper">
    <h2 class="title">
      Form
    </h2>

    <form
      class="form"
      action="/"
      method="post"
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
        />
      </template>

      <p class="hint">
        * fields are mandatory
      </p>

      <button class="button" type="submit" :disabled="!isSubmittable">
        Add entry
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FieldType, FormTransferType } from '@/types';
import Field from '@/components/Field/Field.vue';
import formdata from './formdata';

@Component({
  components: {
    Field,
  },
})
export default class Form extends Vue {
  private fields: FieldType[] = formdata;

  get isSubmittable(): boolean {
    const allFieldsAreValid = this.fields.every((field: FieldType) => field.isValid);

    return allFieldsAreValid;
  }

  handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    const formValues: FormTransferType = this.fields.reduce((total: any, field: FieldType) => {
      const newTotal = total;
      const key = field.id;
      const { value } = field;

      if (newTotal[key] === undefined) {
        newTotal[key] = value;
      }

      return newTotal;
    }, {});

    this.$emit('addNewEntry', formValues);
  }

  handleValidChange(newIsValid: boolean, id: string): void {
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
}
</script>

<style scoped lang="scss">
.form {
  padding: 0;
  max-width: 30rem;
}

.title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed $blue;
}

.hint {
  font-style: italic;
}

</style>
