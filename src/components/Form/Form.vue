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
      :is-valid="fieldsValidity.lastName"
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
  private isSubmittable: boolean = false;
  private fieldsValidity: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
  }

  handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    this.$emit('entryAdded', this.firstName);
  }

  handleValidChange(newIsValid: boolean, id: string): void {
    // const oldIsValid = this.fieldsValidity[id];

    if (typeof newIsValid !== 'boolean') {
      return;
    }

    // eslint-disable-next-line
    this.fieldsValidity = Object.assign({}, this.fieldsValidity, {
      [id]: newIsValid,
    });
  }

  getFormData(): any {
    console.log(this);
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
