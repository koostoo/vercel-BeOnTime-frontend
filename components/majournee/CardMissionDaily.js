//-----------------------------------------------------
// Composant : CardMissionDaily
// Importé par : MaJournee
//-----------------------------------------------------

import React from "react";
// Style
import styles from "../../styles/CardMission.module.css";
import styled from "styled-components";

import axios from "axios";
import { useState } from "react";

// Reducer
import { useDispatch } from "react-redux";
import { removeMission } from "../../reducers/mission";

// UI
import { ViewOffIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Progress,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  ModalFooter,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Toast,
  useToast,
} from "@chakra-ui/react";

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

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TDiv = styled.div`
  display: flex;
  flex-direction: row;
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

function CardMissionDaily(mission) {
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

  //console.log("les props =>", mission);

  // Gestion de la modale Debut ////////////////////////
  // A reprendre et a mettre dans la carte CardMissionDaily
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Les etats
  const [idMission, setIdMission] = useState(mission.idMission);
  const [progression, setProgression] = useState(mission.progression);
  const [tempsRealise, setTempsRealise] = useState(mission.tempsRealise);

  // Le Toast
  const toast = useToast();

  function handleSubmitProgression(event) {
    event.preventDefault();
    const today = new Date().toISOString().substring(0, 10);

    // on va effectuer la modification de la mission
    const body = {
      tempsRealise: tempsRealise,
      progression: progression,
      accompli: today,
    };
    //console.log("Body du put =>", body);
    // on fait le post
    // ${process.env.backend}
    axios
      .put(
        `${process.env.backend}/missions/${idMission}`,
        JSON.stringify(body),
        {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        }
      )
      .then((res) => {
        ////////////////
        // Log du retour
        //console.log("Data received back =>", res.data);

        if (res.data.result) {
          // API retourne result : tue - la mission a été supprimée
          toast({
            title: "Demande de Progression d'une Mission",
            description: "Nous avons bien mis à jour la progression.",
            status: "success",
            duration: 3000,
          });
        } else {
          // API retourne result : false - la mission n'a pas été supprimée
          toast({
            title: "Demande de Progression d'une Mission",
            description: "Nous n'avons pas pu mettre à jour la progression.",
            status: "error",
            duration: 3000,
          });
        }
      });

    // on demande la fermeture de la modale
    onClose();
    // on retire la mission de la liste ma journée
    dispatch(removeMission(mission));
  }
  // Gestion de la modale Fin ///////////////////////////

  //JSX
  //Je prends la fonction removeMission depuis le reducer pour enlevé une mission de daily.
  return (
    <Carte>
      <SDiv>
        <TDiv>
          <IconButton
            size="lg"
            colorScheme="green"
            variant="ghost"
            icon={<ViewOffIcon />}
            onClick={() => dispatch(removeMission(mission))}
          />
          <IconButton
            size="lg"
            colorScheme="teal"
            variant="ghost"
            icon={<TimeIcon />}
            onClick={onOpen}
          />
        </TDiv>
        <Echeance background={EcheanceBackground} border={EcheanceBorder}>
          <NbJours className={nbDeJour.join(" ")}>{mission.nbjour}</NbJours>
        </Echeance>
      </SDiv>
      <FirstDiv>
        <Libelle className="libellé">{mission.libelle}</Libelle>
      </FirstDiv>
      <Entreprise className="entreprise">{mission.entreprise}</Entreprise>

      <BarProgress>
        <Progress value={mission.progression} colorScheme="blue" />
      </BarProgress>

      {/* Definition de la modale modale*/}
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form
              id="new-progression"
              onSubmit={(event) => handleSubmitProgression(event)}
            >
              {/* Temps Passé DEBUT */}
              <FormControl>
                <FormLabel>Temps passé sur la mission</FormLabel>
                <NumberInput
                  onChange={(value) => setTempsRealise(value)}
                  value={tempsRealise}
                  defaultValue={1}
                  max={200}
                  min={1}
                  inputMode="numeric"
                  keepWithinRange={true}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText pt={2}>
                  Saisir le temps passé en heure
                </FormHelperText>
              </FormControl>
              {/* Temps Passé FIN */}

              {/* Progression DEBUT */}
              <FormControl>
                <FormLabel pt={5} pb={5}>
                  Progression de la mission
                </FormLabel>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={progression}
                  onChange={(val) => setProgression(val)}
                >
                  <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
                    25%
                  </SliderMark>
                  <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                    50%
                  </SliderMark>
                  <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                    75%
                  </SliderMark>
                  <SliderMark
                    value={progression}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                  >
                    {progression}%
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <FormHelperText pt={4}>
                  Saisir le pourcentage de progression de la mission
                </FormHelperText>
              </FormControl>
              {/* Progression FIN */}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              //variant="outline"
              type="submit"
              form="new-progression"
            >
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Carte>
  );
}

export default CardMissionDaily;
