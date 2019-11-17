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
      <Field
        name="First name"
        id="firstName"
        label="Name label"
        type="text"
        placeholder="Please enter your first name"
        v-model.trim="firstName"
        :is-valid="fieldsValidity.firstName"
        :is-required="fieldsMandatoryValues.firstName"
        @isValidChange="handleValidChange"
      />

      <Field
        name="Last name"
        id="lastName"
        label="Last label"
        type="text"
        placeholder="Please enter your last name"
        v-model.trim="lastName"
        :is-valid="fieldsValidity.lastName"
        :is-required="fieldsMandatoryValues.lastName"
        @isValidChange="handleValidChange"
      />

      <Field
        name="Email"
        id="email"
        label="Email label"
        type="email"
        placeholder="Please enter your email"
        v-model.trim="email"
        :is-valid="fieldsValidity.email"
        :is-required="fieldsMandatoryValues.email"
        @isValidChange="handleValidChange"
      />

      <Field
        name="Customer Query"
        id="customerQuery"
        label="Customer query"
        type="textarea"
        placeholder="Please enter your customer query"
        v-model.trim="customerQuery"
        :is-required="fieldsMandatoryValues.customerQuery"
        @isValidChange="handleValidChange"
      />

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
import Field from '@/components/Field/Field.vue';

@Component({
  components: {
    Field,
  },
})
export default class Form extends Vue {
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private customerQuery: string = '';
  private fieldsValidity: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
    customerQuery: true,
  }
  private fieldsMandatoryValues: { [key: string]: boolean } = {
    firstName: true,
    lastName: true,
    email: true,
    customerQuery: false,
  }

  get isSubmittable(): boolean {
    const fieldValues = Object.values(this.fieldsValidity);
    const allFieldsAreValid = fieldValues.every((field: boolean) => field);

    return allFieldsAreValid;
  }

  handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    const { firstName, lastName, email, customerQuery } = this;

    this.$emit('addNewEntry', {
      firstName,
      lastName,
      email,
      customerQuery,
    });
  }

  handleValidChange(newIsValid: boolean, id: string): void {
    if (typeof newIsValid !== 'boolean') {
      return;
    }

    const newFieldsValidity = { ...this.fieldsValidity, [id]: newIsValid };
    this.fieldsValidity = newFieldsValidity;
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
