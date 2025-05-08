import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    token: "",
    idUser: "",
    nameRole: "",
    loggedIn: false,
  }),

  actions: {
    login(userData: {
      name: string;
      email: string;
      token: string;
      idUser: string;
      nameRole: string;
    }) {
      this.name = userData.name;
      this.email = userData.email;
      this.token = userData.token;
      this.idUser = userData.idUser;
      this.nameRole = userData.nameRole;
      this.loggedIn = true;
    },

    logout() {
      this.name = "";
      this.email = "";
      this.token = "";
      this.idUser = "";
      this.nameRole = "";
      this.loggedIn = false;
    },
  },

  persist: true,
});
