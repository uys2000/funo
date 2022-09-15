import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => ({
    user: {},
    lastUser: {},
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setLastUser(user) {
      this.lastUser = user;
    },
  },
  getters: {
    fire: (state) => {
      if (state.user.userFire) return state.user.userFire;
      else return false;
    },
    auth: (state) => {
      if (state.user.userAuth) return state.user.userAuth;
      else return false;
    },
    ID: (state) => {
      if (state.user.userAuth) return state.user.userAuth.user.uid;
      else return false;
    },
    name: (state) => {
      if (state.user.userFire) return state.user.userFire.name;
      else return false;
    },
    tags: (state) => {
      if (state.user.userFire?.tags) return state.user.userFire?.tags;
      else return ["spor", "artt", "educ", "musi", "meet", "part"];
    },
    jEvents: (state) => {
      if (state.user.userFire?.joinEvent) return state.user.userFire?.joinEvent;
      else return null;
    },
    addJEvents: (state) => {
      if (state.user.userFire?.joinEvent) return state.user.userFire?.joinEvent;
      else return null;
    },
  },
});
