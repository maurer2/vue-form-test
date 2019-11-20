import Vue from 'vue';
import Vuex from 'vuex';
import { EntryType } from '../types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entries: [] as EntryType[],
  },
  mutations: {
    addEntry(state, entry: EntryType) {
      state.entries.push(entry);
    },
  },
  actions: {
    addEntry({ commit }, entry: EntryType) {
      commit('addEntry', entry);
    },
  },
  getters: {
    nameOfEntries: (state) => state.entries.map((entry: EntryType) => `${entry.firstName} ${entry.lastName}`),
  },
});
