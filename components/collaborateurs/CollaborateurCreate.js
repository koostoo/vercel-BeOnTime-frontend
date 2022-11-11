//-----------------------------------------------------
// Composant : CollaborateurCreate
// Importé par : Collaborateurs
//-----------------------------------------------------

import { useState } from "react";
import axios from "axios";

import {
  Button,
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Heading,
  useToast,
  HStack,
} from "@chakra-ui/react";

function CollaborateurCreate(props) {
  // states passés en Props
  const [idCollab, setIdCollab] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  // Les flags pour les erreurs
  const [isErrorIdCollab, setIsErrorIdCollab] = useState(false);
  const [isErrorNom, setIsErrorNom] = useState(false);
  const [isErrorPrenom, setIsErrorPrenom] = useState(false);

  // Les Toasts
  const toastCreate = useToast();

  // HandleSubmit ///////////////////////////////////////////////////////DEBUT
  const handleSubmit = () => {
    let validated = true;
    // validation :idCollab
    if (idCollab === "") {
      setIsErrorIdCollab(true);
      validated = false;
    } else {
      setIsErrorIdCollab(false);
    }
    // validation :nom
    if (nom === "") {
      setIsErrorNom(true);
      validated = false;
    } else {
      setIsErrorNom(false);
    }

    // validation :prenom
    if (prenom === "") {
      setIsErrorPrenom(true);
      validated = false;
    } else {
      setIsErrorPrenom(false);
    }

    console.log("validated =>", validated);
    const collaborateur = {
      idCollab,
      nom,
      prenom,
    };
    console.log("le collaborateur est => ", collaborateur);
    //alert(JSON.stringify(collaborateur));

    // Si les champs sont validés
    // on va faire appel API de Création
    if (validated === true) {
      // on prepare le body
      const body = {
        username: idCollab,
        nom: nom,
        prenom: prenom,
        password: "azerty",
        picture: "https://minimaltoolkit.com/images/randomdata/male/79.jpg",
        isManager: "false",
        isCollab: "true",
        isWorking: "true",
      };

      console.log("Body du post =>", body);

      // on fait le post
      // ${process.env.backend}
      axios
        .post(`${process.env.backend}/users/signup`, JSON.stringify(body), {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : true - le collaborateur a été créé
            toastCreate({
              title: "Demande Création Collaborateur",
              description: "Nous avons bien créé le Collaborateur.",
              status: "success",
              duration: 3000,
            });
          } else {
            // API retourne result : false - le collaborateur n'a pas été créé
            toastCreate({
              title: "Demande Création Collaborateur",
              description: "Nous n'avons pas pu créer le Collaborateur.",
              status: "error",
              duration: 3000,
            });
          }

          // on demande l'appel de handleCreateyCollborateurClose
          handleCreateCollaborateurClose();
          //
        });
    }
  };
  // HandleSubmit ////////////////FIN

  // Inverse Data Flow handleCreateCollaborateurClose //////DEBUT
  const handleCreateCollaborateurClose = () => {
    props.handleCreateCollaborateurClose();
  };
  // HandleCreateCollaborateurClose ////////////////////////FIN

  return (
    <>
      <Flex
        mt={5}
        height="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box width={500} height="100%">
          <Box shadow="md" background="gray.50" rounded={6} mt={2} mb={5} p={5}>
            {/* idCollab du Collaborateur DEBUT ----------------------------------------*/}
            <center>
              <Heading size="md">
                <Text p={2}>Création d'un Collaborateur</Text>
              </Heading>
            </center>
            <FormControl isRequired mt={5} isInvalid={isErrorIdCollab}>
              <FormLabel>idCollab</FormLabel>
              <Input
                placeholder="C99"
                value={idCollab}
                onChange={(event) => setIdCollab(event.target.value)}
              />
              <FormHelperText>
                Saisir l'id unique du collaborateur.
              </FormHelperText>
              <FormErrorMessage>idClient requis.</FormErrorMessage>
            </FormControl>

            {/* idClient du Collaborateur FIN ---------------------------------- */}

            {/* nom du Collaborateur DEBUT --------------------------------------*/}
            <FormControl isRequired mt={8} isInvalid={isErrorNom}>
              <FormLabel>Nom</FormLabel>
              <Input
                placeholder="Nom..."
                value={nom}
                onChange={(event) => setNom(event.target.value)}
              />
              <FormHelperText>Saisir le nom.</FormHelperText>
              <FormErrorMessage>Nom requis.</FormErrorMessage>
            </FormControl>
            {/* nom du Collaborateur FIN ------------------------------------------*/}

            {/* prenom du Collaborateur DEBUT --------------------------------------*/}
            <FormControl isRequired mt={8} isInvalid={isErrorPrenom}>
              <FormLabel>Prénom</FormLabel>
              <Input
                placeholder="Prénom..."
                value={prenom}
                onChange={(event) => setPrenom(event.target.value)}
              />
              <FormHelperText>Saisir le prénom.</FormHelperText>
              <FormErrorMessage>Prénom requis.</FormErrorMessage>
            </FormControl>
            {/* prénom du Collaborateur FIN ------------------------------------------*/}
          </Box>
          <Box>
            <HStack spacing="24px" align="center" justifyContent="center">
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => handleCreateCollaborateurClose()}
              >
                Annuler
              </Button>
              <Button colorScheme="teal" onClick={() => handleSubmit()}>
                Créer le Collaborateur
              </Button>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default CollaborateurCreate;
