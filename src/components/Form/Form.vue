<template>
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
      v-model.trim="firstName"
      :is-valid="fieldsValidity.firstName"
      @isValidChange="handleValidChange"
    />
    <Field
      name="Last name"
      id="lastName"
      label="Last label"
      type="text"
      v-model.trim="lastName"
      :is-valid="fieldsValidity.lastName"
      @isValidChange="handleValidChange"
    />
    <Field
      name="Email"
      id="email"
      label="Email label"
      type="email"
      v-model.trim="email"
      :is-valid="fieldsValidity.email"
      @isValidChange="handleValidChange"
    />
    <pre>
      {{ fieldsValidity }}
    </pre>
    <button class="button" type="submit" :disabled="!isSubmittable">
      Add
    </button>
  </form>
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
  private fieldsValidity: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
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

    const { firstName, lastName, email } = this;

    this.$emit('addNewEntry', {
      firstName,
      lastName,
      email,
    });
  }

  handleValidChange(newIsValid: boolean, id: string): void {
    // const oldIsValid = this.fieldsValidity[id];

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
  position: relative;
  padding: 0;
}

// .button {}

</style>
