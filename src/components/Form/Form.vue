<template>
  <form
    class="form"
    action="/"
    method="post"
    @submit.prevent="handleSubmit"
  >
    <Field
      name="First name"
      label="Name label"
      v-model.trim="firstName"
      type="text"
    />
    <Field
      name="Last name"
      label="Last label"
      v-model.trim="lastName"
      type="text"
    />
    <Field
      name="Email"
      label="Email label"
      v-model.trim="email"
      type="email"
    />
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

  handleSubmit(): void {
    if (!this.isSubmittable) {
      return;
    }

    this.$emit('entryAdded', this.firstName);
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
