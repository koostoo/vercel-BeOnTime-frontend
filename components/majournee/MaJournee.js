//-----------------------------------------------------
// Composant : MaJournee
// Injecté par la page : pages/majournee.js
//-----------------------------------------------------

// Functional Component
import CardMissionDaily from "./CardMissionDaily";

// Librairies
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// UI
import { Flex } from "@chakra-ui/react";

function MaJournee() {
  // Redux
  //Je vais chercher le state de mon reducer mission pour utiliser mes objets cartes, je les stocke dans missionReduce
  const missionReduce = useSelector((state) => state.mission.value);
  //console.log(missionReduce, "REDUCER MISSIONS");

  // Variable CSS
  const h1Style = {
    marginBottom: "4vh",
    color: "darkblue",
    // paddingLeft: '30px',
    paddingTop: "20px",
    fontSize: "30px",
  };

  // Map sur les missions dans le reducer
  let missions = [];
  if (missions) {
    // console.log(mission.echeance);
    missions = missionReduce.map((mission, index) => {
      // console.log(missionReduce[index].libelle, "OKOK");

      return (
        <CardMissionDaily
          key={index}
          idMission={mission.idMission}
          libelle={mission.libelle}
          entreprise={mission.entreprise}
          progression={mission.progression}
          nbjour={mission.nbjour}
          tempsRealise={mission.tempsRealise}
        />
      );
    });
  }

  // JSX
  return (
    <div className="Ma journée">
      <Flex textAlign="center" alignItems="center" flexDirection="column" m={0}>
        <h1 style={h1Style}>
          <b>Ma journée </b>
        </h1>
        <div>{missions}</div>
      </Flex>
    </div>
  );
}

export default MaJournee;
