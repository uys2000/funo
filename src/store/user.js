import { defineStore } from "pinia";

const user = {
  uID: "",
  general: {
    name: "",
    nickName: "",
    birthdate: { nanoseconds: 0, seconds: 0 },
    gender: false,
  },
  account: {
    isPerson: true,
    mail: "",
    phoneNumber: "",
    photoURL: "",
  },
  settings: {
    isHidden: false,
    isReceivable: true,
    theme: "default",
  },
  count: {
    point: 0,
    follower: 0,
    followed: 0,
  },
};

const company = {
  uID: "",
  general: {
    taxID: "",
    address: "",
  },
  location: {
    latitude: 0,
    longitude: 0,
  },
  isChecked: false,
};

const auth = {
  accessToken: "",
  languageCode: "",
  currentUser: {
    accessToken: "",
    displayName: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: "",
    photoURL: "",
    uid: "",
  },
};
export const useUserRegister = defineStore("UserRegister", {
  state: () => ({
    photo: null,
    photoUrl: "",
    password: "",
    agreement: false,

    user: user,
    company: company,
  }),
  actions: {
    clear() {
      this.photo = null;
      this.photoUrl = "";
      this.password = "";
      this.agreement = false;

      this.user = user;
      this.company = company;
    },
  },
});

export const useUser = defineStore("User", {
  state: () => ({
    user: {
      userAuth: auth,
      userFire: user,
      userComp: company,
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setUserAuth(userAuth) {
      this.user.userAuth = userAuth;
    },
    setUserFire(userFire) {
      this.user.userFire = userFire;
    },
  },
  getters: {
    uID: (state) => {
      if (state.user.userAuth) return state.user.userAuth.uid;
      else return false;
    },
    name: (state) => {
      if (state.user.userFire) return state.user.userFire.name;
      else return false;
    },
    userName: (state) => {
      if (state.user.userFire) return state.user.userFire.userName;
      else return false;
    },
  },
});

export const useUsers = defineStore("Users", {
  state: () => ({
    userDict: {},
    userList: [],
  }),
});
