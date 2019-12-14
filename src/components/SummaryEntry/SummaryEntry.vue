<template>
  <div class="wrapper">
    <button
      class="button"
      type="button"
      :class="{ 'button--is-active' : isActive }"
      @click="handleClick"
    >
      {{ entry.firstName }} {{ entry.lastName }}
    </button>

    <template v-if="isActive">
      <template v-for="(item, key) in itemsToShow">
        <dl class="detail" :key="item">
          <dt class="key">
            {{ itemsToShow[key] }}
          </dt>
          <dd class="value">
            {{ entry[key] }}
          </dd>
        </dl>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { EntryType } from 'components/types/index.ts';

@Component
export default class SummaryEntry extends Vue {
  @Prop() private isActive!: boolean;
  @Prop() private entry!: EntryType;
  @Prop() private index!: number;

  private itemsToShow: { [key: string]: string } = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    customerQuery: 'Customer query',
  };

  private handleClick(): void {
    this.$emit('entryClicked', this.index);
  }
}
</script>

<style scoped lang="scss">
.entry {
  display: flex;
  margin-top: 0.75rem;
  margin-left: 0.75rem;
  flex-direction: column;

  &--is-active {
    flex-grow: 1;
    flex-basis: 100%;
    flex-shrink: 0;
  }
}

.button {
  position: relative;
  padding-right: 2.5rem;

  &:after {
    content: '';
    position: absolute;
    right: 1rem;
    top: 50%;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.5rem solid $white;
    transform: translateY(-50%);
  }

  &--is-active:after {
    border-top: 0;
    border-bottom: 0.5rem solid $white;
  }
}

.detail {
  display: flex;
  margin: 0.5rem 1rem 0 1rem;
}

.key {
  margin: 0;
  flex-basis: 6rem;
  font-weight: bold;
}

.value {
  margin: 0rem;
}
</style>
