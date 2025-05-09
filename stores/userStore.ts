import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    token: "",
    idUser: "",
    nameRole: "",
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
    },

    logout() {
      this.name = "";
      this.email = "";
      this.token = "";
      this.idUser = "";
      this.nameRole = "";
    },
  },

  persist: true,
});
