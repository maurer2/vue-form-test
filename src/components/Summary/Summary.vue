<template>
  <div class="summary">
    <h2 class="title">
      Summary
    </h2>

    <template v-if="entries.length === 0">
      <p class="message">
        No entries found.
      </p>
    </template>

    <template v-else>
      <ul class="list">
        <template v-for="(entry, index) in entries">
          <li
            class="entry"
            :class="{ 'entry--is-active' : (index === activeEntry) }"
            :key="index"
          >
            <SummaryEntry
              :index="index"
              :is-active="(index === activeEntry)"
              :entry="entry"
              @entryClicked="handleEntryClicked"
            />
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { EntryType } from '@/types';
import SummaryEntry from '@/components/SummaryEntry/SummaryEntry.vue';

@Component({
  components: {
    SummaryEntry,
  },
})
export default class Summary extends Vue {
  private activeEntry: number = (this.entries.length > 0) ? 0 : -1;

  get entries(): EntryType[] {
    return this.$store.state.entries;
  }

  private handleEntryClicked(indexOfClickedElement: number): void {
    this.activeEntry = (indexOfClickedElement === this.activeEntry) ? -1 : indexOfClickedElement;
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

</style>
