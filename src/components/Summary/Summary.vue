<template>
  <div class="summary">
    <h2 class="title">
      Summary ({{ entries.length }} entries)
    </h2>
    <p class="message" v-if="entries.length === 0">
      No entries found.
    </p>
    <ul class="summary" v-else>
      <template v-for="(entry, index) in entries">
        <li class="entry" :key="index">
          <button class="button" type="button" @click="handleClick(index)">
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
                Customer Query
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

  handleClick(index: number) {
    if (index === this.activeEntry) {
      this.activeEntry = -1;
      return;
    }

    this.activeEntry = index;
  }
}
</script>

<style scoped lang="scss">
.summary {
  list-style: none;
  padding: 0;
}

.entry {

}

.detail {
  display: flex;
}

.key {
  margin: 0;

  &:after {
    content: ":";
  }
}

.value {

}
</style>
