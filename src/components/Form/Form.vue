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
import { FieldType } from '@/types.ts';
import Field from '../Field/Field.vue';

@Component({
  components: {
    Field,
  },
})
export default class Form extends Vue {
  private fields: FieldType[] = [
    {
      value: '',
      name: 'First name',
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Please enter your first name',
      isValid: false,
      isRequired: true,
    },
    {
      value: '',
      name: 'Last name',
      id: 'lastName',
      label: 'Last name',
      type: 'text',
      placeholder: 'Please enter your last name',
      isValid: false,
      isRequired: true,
    },
    {
      value: '',
      name: 'Email',
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Please enter your email',
      isValid: false,
      isRequired: true,
    },
    {
      value: '',
      name: 'Customer Query',
      id: 'customerQuery',
      label: 'Customer query',
      type: 'textarea',
      placeholder: 'Please enter your customer query',
      isValid: true,
      isRequired: true,
    },
  ];

  get isSubmittable(): boolean {
    const allFieldsAreValid = this.fields.every((field: FieldType) => field.isValid);

    return allFieldsAreValid;
  }

  handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    // this.$emit('addNewEntry', this.fields);
  }

  handleValidChange(newIsValid: boolean, id: string): void {
    if (typeof newIsValid !== 'boolean') {
      return;
    }

    const newFields = [...this.fields];
    const fieldToUpdateIndex: number = newFields.findIndex((field) => field.id === id);

    if (fieldToUpdateIndex === -1) {
      return;
    }

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
