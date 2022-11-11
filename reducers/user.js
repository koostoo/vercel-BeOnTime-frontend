//---------------------------------------------------
// REDUCER : user
// Utilisé pour gérer la connexion de l'utilisateur
//---------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    nom: null,
    prenom: null,
    picture: null,
    isCollab: false,
    isManager: false,
    isWorking: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.nom = action.payload.nom;
      state.value.prenom = action.payload.prenom;
      state.value.picture = action.payload.picture;
      state.value.isCollab = action.payload.isCollab;
      state.value.isManager = action.payload.isManager;
      state.value.isWorking = action.payload.isWorking;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.picture = null;
      state.value.isCollab = false;
      state.value.isManager = false;
      state.value.isWorking = false;
    },
  },
});

// nom;
// ("Coustou");
// prenom;
// ("Yves");
// picture;
// ("aucune");
// isManager;
// true;
// isCollab;
// true;
// isWorking;
// true;

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
