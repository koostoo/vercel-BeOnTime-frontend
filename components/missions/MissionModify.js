//-----------------------------------------------------
// Composant : MissionModify
// Importé par : Missions
//-----------------------------------------------------

import { useState } from "react";
import axios from "axios";

// UI
import {
  Button,
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Heading,
  useToast,
  Stack,
} from "@chakra-ui/react";

function ModifyMission(props) {
  console.log("Composant Modify Mission");
  console.log("Props are", props);

  //on met a defaut les states
  const [idMission, setIdMission] = useState(props.idMission);
  const [idClient, setIdClient] = useState(props.idClient);
  const [idCollab, setIdCollab] = useState(props.idCollab);
  const [entreprise, setEntreprise] = useState(props.entreprise);
  const [libelle, setLibelle] = useState(props.libelle);
  const [type, setType] = useState(props.type);
  const [echeance, setEcheance] = useState(props.echeance);
  const [tempsPrevu, setTempsPrevu] = useState(props.tempsPrevu);

  // Les flags pour les erreurs
  const [isErrorType, setIsErrorType] = useState(false);
  const [isErrorLibelle, setIsErrorLibelle] = useState(false);
  const [isErrorTempsPrevu, setIsErrorTempsPrevu] = useState(false);
  const [isErrorEcheance, setIsErrorEcheance] = useState(false);
  const [isErrorIdCollab, setIsErrorIdCollab] = useState(false);

  // Les Toasts
  const toastModify = useToast();

  // HandleSubmit ////////////////////////DEBUT
  const handleSubmit = () => {
    let validated = true;
    // validation :type
    if (type === "") {
      setIsErrorType(true);
      validated = false;
    } else {
      setIsErrorType(false);
    }
    // validation :libelle
    if (libelle === "") {
      setIsErrorLibelle(true);
      validated = false;
    } else {
      setIsErrorLibelle(false);
    }

    //validation :temps
    if (tempsPrevu === 0) {
      setIsErrorTempsPrevu(true);
      validated = false;
    } else {
      setIsErrorTempsPrevu(false);
    }

    // validation :echeance
    if (echeance === "") {
      setIsErrorEcheance(true);
      validated = false;
    } else {
      setIsErrorEcheance(false);
    }

    // validation affectation
    if (idCollab === "") {
      setIsErrorIdCollab(true);
      validated = false;
    } else {
      setIsErrorIdCollab(false);
    }

    console.log("validated =>", validated);
    const mission = {
      idMission,
      idClient,
      idCollab,
      entreprise,
      libelle,
      type,
      echeance,
      tempsPrevu,
    };
    console.log("la mission est => ", mission);
    //alert(JSON.stringify(mission));

    // Si une création et les champs validés
    // on va faire appel API de Création
    if (validated === true) {
      // on prepare le body avec les informations
      const body = {
        idClient: idClient,
        idCollab: idCollab,
        entreprise: entreprise,
        libelle: libelle,
        type: type,
        echeance: echeance,
        tempsPrevu: tempsPrevu,
      };

      console.log("Body du post =>", body);

      // on fait le post

      axios
        .put(
          `${process.env.backend}/missions/${idMission}`,
          JSON.stringify(body),
          {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }
        )
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : tue - la mission a été supprimée
            toastModify({
              title: "Demande Modification Mission",
              description: "Nous avons bien modifié la mission.",
              status: "success",
              duration: 3000,
            });
          } else {
            // API retourne result : false - la mission n'a pas été supprimée
            toastModify({
              title: "Demande Modification Mission",
              description: "Nous n'avons pas pu modifier la mission.",
              status: "error",
              duration: 3000,
            });
          }

          // on demande l'appel de handleModifyMissionClose
          handleModifyMissionClose();
        });
    }
  };
  // HandleSubmit ////////////////////////FIN

  // Inverse Data Flow
  // handleModifyMissionClose //////DEBUT
  const handleModifyMissionClose = () => {
    props.handleModifyMissionClose();
  };
  // HandleModifyMissionClose ////////////////////////FIN

  return (
    <>
      <Flex
        mt={5}
        height="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={500}
          height="auto"
          shadow="md"
          background="gray.50"
          rounded={6}
          mt={2}
          mb={5}
          p={5}
        >
          {/* type de Mission DEBUT -------------------------------------------*/}
          <center>
            <Heading size="md">
              <Text p={3}>Modification de la Mission</Text>
            </Heading>
          </center>

          <FormControl isRequired isInvalid={isErrorType}>
            <FormLabel>Type de Mission</FormLabel>
            <Select
              placeholder="Type de mission"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option>COMPTA</option>
              <option>TVA</option>
              <option>PAIE</option>
              <option>BILAN</option>
            </Select>
            <FormHelperText>Choisir le type de mission.</FormHelperText>
            <FormErrorMessage>Type requis.</FormErrorMessage>
          </FormControl>
          {/* type de Mission FIN --------------------------------------------- */}

          {/* libelle Mission DEBUT ------------------------------------------*/}
          <FormControl isRequired mt={8} isInvalid={isErrorLibelle}>
            <FormLabel>Libellé de la Mission</FormLabel>
            <Input
              placeholder="COMPTA Mensuelle - TVA Trimestrielle"
              value={libelle}
              onChange={(event) => setLibelle(event.target.value)}
            />
            <FormHelperText>Saisir le libellé de la mission.</FormHelperText>
            <FormErrorMessage>Libellé requis.</FormErrorMessage>
          </FormControl>
          {/* libelle Mission FIN  -------------------------------------------*/}

          {/* tempsPrevu DEBUT ---------------------------------------------------*/}
          <FormControl isRequired mt={8} isInvalid={isErrorTempsPrevu}>
            <FormLabel>Durée Prévue</FormLabel>
            <NumberInput
              onChange={(value) => setTempsPrevu(value)}
              value={tempsPrevu}
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
            <FormHelperText>
              Choisir la durée prévue de la mission en heure.
            </FormHelperText>
            <FormErrorMessage>
              Durée d'une heure minimum requise.
            </FormErrorMessage>
          </FormControl>
          {/* tempsPrevu FIN */}

          {/* Date Echéance DEBUT --------------------------------------------- */}
          <FormControl isRequired mt={8} isInvalid={isErrorEcheance}>
            <FormLabel>Echéance</FormLabel>
            <Input
              type="date"
              value={echeance}
              onChange={(event) => setEcheance(event.target.value)}
            />
            <FormHelperText>
              Choisir la date d'échéance de la mission.
            </FormHelperText>
            <FormErrorMessage>Echéance requise.</FormErrorMessage>
          </FormControl>
          {/* Date Echéance FIN ------------------------------------------------ */}

          {/* affectation Collaborateur DEBUT ---------------------------------- */}
          <FormControl isRequired mt={8} isInvalid={isErrorIdCollab}>
            <FormLabel>Collaborateur</FormLabel>
            <Select
              placeholder="Collaborateur en charge"
              value={idCollab}
              onChange={(event) => setIdCollab(event.target.value)}
            >
              <option>C01</option>
              <option>C02</option>
              <option>C03</option>
              <option>C04</option>
            </Select>
            <FormHelperText>
              Choisir le collaborateur qui sera en charge de la mission.
            </FormHelperText>
            <FormErrorMessage>Collaborateur requis.</FormErrorMessage>
          </FormControl>
          {/* affectation Collaborateur FIN ------------------------------------- */}
        </Box>
        <Box>
          <Stack spacing="24px" direction="row">
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleModifyMissionClose()}
            >
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={() => handleSubmit()}>
              Modifier la Mission
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

export default ModifyMission;
