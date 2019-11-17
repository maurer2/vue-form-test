import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entries: [] as any,
  },
  mutations: {
    addEntry(state, entry) {
      state.entries.push(entry);
    },
  },
  actions: {
    addEntry({ commit }, entry) {
      commit('addEntry', entry);
    },
  },
  getters: {
    nameOfEntries: (state) => state.entries.map((entry: any) => `${entry.firstName} ${entry.lastName}`),
  },
});
