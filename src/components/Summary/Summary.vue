<template>
  <div class="summary">
    <h2 class="title">
      Summary
    </h2>
    <p class="message" v-if="entries.length === 0">
      No entries found.
    </p>
    <ul class="list" v-else>
      <template v-for="(entry, index) in entries">
        <li class="entry" :class="{ 'entry--is-active' : (index === activeEntry) }" :key="index">
          <button
            type="button"
            class="button"
            :class="{ 'button--is-active' : (index === activeEntry) }"
            @click="handleClick(index)"
          >
            {{ entry.firstName }} {{ entry.lastName }}
          </button>

          <template v-if="activeEntry === index">
            <dl class="detail">
              <dd class="key">
                First name
              </dd>
              <dd class="value">
                {{ entry.firstName }}
              </dd>
            </dl>

            <dl class="detail">
              <dd class="key">
                Last name
              </dd>
              <dd class="value">
                {{ entry.lastName }}
              </dd>
            </dl>

            <dl class="detail">
              <dd class="key">
                E-mail
              </dd>
              <dd class="value">
                {{ entry.email }}
              </dd>
            </dl>

            <dl class="detail" v-if="entry.customerQuery.length > 0">
              <dd class="key">
                Query
              </dd>
              <dd class="value">
                {{ entry.customerQuery }}
              </dd>
            </dl>
          </template>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Field extends Vue {
  private activeEntry: number = (this.entries.length > 0) ? 0 : -1;

  get entries() {
    return this.$store.state.entries;
  }

  handleClick(index: number): void {
    if (index === this.activeEntry) {
      this.activeEntry = -1;
      return;
    }

    this.activeEntry = index;
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed $blue;
}

.list {
  display: flex;
  margin: 1rem 0;
  margin-top: -0.75rem;
  margin-left: -0.75rem;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
}

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
