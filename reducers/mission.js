//---------------------------------------------------
// REDUCER : Missions
// Utilisé pour gérer la journée du Collaborateur
//---------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    //Ajouter une mission au state du reducer, si l'idMission de la carte n'est pas le même que celui qu'on veut ajouté dans le reducer,
    //on rentre dans le push dans le state.
    addMissionToJourney: (state, action) => {
      // console.log(state.value,"STATEVALUE");
      const result = state.value.find(
        (mission) => mission.idMission === action.payload.idMission
      );
      if (!result) {
        // console.log(result,'Mission ajoutée');
        // console.log(action.payload.idMission,"ACTION")
        if (!state.value.includes(action.payload)) {
          state.value.push(action.payload);
        }
      }
    },
    //Filtre dans le state du reducer en le triant par l'id de la mission pour effacer une mission du reducer
    removeMission: (state, action) => {
      state.value = state.value.filter(
        (mission) => mission.idMission !== action.payload.idMission
      );
      // console.log('Mission deleted');
    },
  },
});

export const { addMissionToJourney, loadMissionsJourney, removeMission } =
  missionSlice.actions;
export default missionSlice.reducer;
