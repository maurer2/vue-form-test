<template>
  <div class="summary">
    <h2>
      Summary ({{ entries.length }} entries)
    </h2>
    <p class="message" v-if="entries.length === 0">
      No entries found.
    </p>
    <ul class="summary" v-else>
      <template v-for="(entry, index) in entries">
        <li class="entry" :key="index">
          <pre>
            {{ entry }}
          </pre>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Field extends Vue {
  get entries() {
    return this.$store.state.entries;
  }
}
</script>

<style scoped lang="scss">

</style>
