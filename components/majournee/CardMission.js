//-----------------------------------------------------
// Composant : CardMission
// Importé par : MesMissions
//-----------------------------------------------------

import React from "react";
import styles from "../../styles/CardMission.module.css";
import { Progress } from "@chakra-ui/react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addMissionToJourney } from "../../reducers/mission";

// Styled Component
const Carte = styled.div`
  background-color: rgb(231, 227, 227);
  border: 1px solid silver;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-family: arial;
  padding: 1vw;
  margin: 0.3vh;
  margin-left: 2vw;
  margin-bottom: 2vh;
  display: inline-block;
  width: 15vw;
  text-align: left;
  box-shadow: 0 0 28px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
const FirstDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Libelle = styled.div`
  color: darkblue;
  font-size: 2vh;
  margin-top: 30px;
`;

const Entreprise = styled.h2`
  color: black;
  font-size: 1.7vh;
  margin-top: 5px;
`;

const Echeance = styled.p`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  justify-content: center;
  border: 2px solid ${(mission) => mission.border};
  border-radius: 20px;
  background: ${(mission) => mission.background};
`;

const NbJours = styled.b`
  font-size: 18px;
`;

const BarProgress = styled.div`
  margin-top: 15px;
  margin-bottom: -15px;
  width: 14.6vw;
  margin-left: -15px;
`;

function CardMission(mission) {
  //Redux
  const dispatch = useDispatch();
  // Variable : changement de couleur en fonction des jours restants pour réaliser la mission
  const nbDeJour = [];
  let EcheanceBackground;
  let EcheanceBorder;

  if (mission.nbjour <= 0) {
    nbDeJour.push(styles.black);
    EcheanceBackground = "#dbdee1";
    EcheanceBorder = "#4b5c6b";
  } else if (mission.nbjour <= 3) {
    nbDeJour.push(styles.red);
    EcheanceBackground = "#f7dade";
    EcheanceBorder = "#d3455b";
  } else if (mission.nbjour <= 7) {
    nbDeJour.push(styles.orange);
    EcheanceBackground = "#fef3d4";
    EcheanceBorder = "#f7c325";
  } else {
    nbDeJour.push(styles.green);
    EcheanceBackground = "#d1efec";
    EcheanceBorder = "#1aae9f";
  }

  //JSX
  //Je prend la fonction addMissionToJourney depuis le reducer mission afin d'ajouté une mission cliquée dans le state du reducer
  return (
    <Carte onClick={() => dispatch(addMissionToJourney(mission))}>
      <FirstDiv>
        <Libelle className="libellé">{mission.libelle}</Libelle>
        <Echeance background={EcheanceBackground} border={EcheanceBorder}>
          {" "}
          <NbJours className={nbDeJour.join(" ")}>{mission.nbjour}</NbJours>
        </Echeance>
      </FirstDiv>
      <Entreprise className="entreprise">{mission.entreprise}</Entreprise>
      <BarProgress>
        <Progress value={mission.progression} colorScheme="blue" />
      </BarProgress>
    </Carte>
  );
}

export default CardMission;
