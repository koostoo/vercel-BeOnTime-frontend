//-----------------------------------------------------
// Composant : CollaborateurModify
// Importé par : Collaborateurs
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
  Text,
  Heading,
  useToast,
  Stack,
} from "@chakra-ui/react";

function CollaborateurModify(props) {
  console.log("Composant Modify Collaborateur");
  console.log("Props are", props);

  //on met a defaut les states
  const [idCollab, setIdCollab] = useState(props.username);
  const [nom, setNom] = useState(props.nom);
  const [prenom, setPrenom] = useState(props.prenom);

  // Les flags pour les erreurs
  const [isErrorIdCollab, setIsErrorIdCollab] = useState(false);
  const [isErrorNom, setIsErrorNom] = useState(false);
  const [isErrorPrenom, setIsErrorPrenom] = useState(false);

  // Les Toasts
  const toastModify = useToast();

  // HandleSubmit ////////////////////////DEBUT
  const handleSubmit = () => {
    let validated = true;

    // validation idCollab
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

    // Si les champs validés
    // on va faire appel API de Modification
    if (validated === true) {
      // on prepare le body avec les informations
      const body = {
        nom: nom,
        prenom: prenom,
      };

      console.log("Body du post =>", body);

      // on fait le post
      //
      axios
        .put(`${process.env.backend}/users/${idCollab}`, JSON.stringify(body), {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : true - le collaborateur a été modifié
            toastModify({
              title: "Demande Modification Collaborateur",
              description: "Nous avons bien modifié le collaborateur.",
              status: "success",
              duration: 3000,
            });
          } else {
            // API retourne result : false - le collaborateur n'a pas été modifié
            toastModify({
              title: "Demande Modification Collaborateur",
              description: "Nous n'avons pas pu modifier le collaborateur.",
              status: "error",
              duration: 3000,
            });
          }

          // on demande l'appel de handleModifyCollaborateurClose
          handleModifyCollaborateurClose();
        });
    }
  };
  // HandleSubmit ////////////////////////FIN

  // Inverse Data Flow
  // handleModifyCollaborateurClose //////DEBUT
  const handleModifyCollaborateurClose = () => {
    props.handleModifyCollaborateurClose();
  };
  // HandleModifyCollaborateurClose ////////////////////////FIN

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
          {/* idClient du Collaborateur DEBUT ----------------------------------------*/}
          <center>
            <Heading size="md">
              <Text p={3}>Modification d'un Collaborateur</Text>
            </Heading>
          </center>
          <FormControl isRequired mt={5} isInvalid={isErrorIdCollab}>
            <FormLabel>idCollaborateur</FormLabel>
            <Input
              placeholder="CTL01"
              isReadOnly="true"
              value={idCollab}
              onChange={(event) => setIdCollab(event.target.value)}
            />
            <FormHelperText>Vous ne pouvez pas modifier l'id.</FormHelperText>
            <FormErrorMessage>idCollab requis.</FormErrorMessage>
          </FormControl>

          {/* idCollaborateur du Collaborateur FIN ----------------------------------------- */}

          {/* nom du Collaborateur DEBUT --------------------------------------*/}
          <FormControl isRequired mt={8} isInvalid={isErrorNom}>
            <FormLabel>Nom</FormLabel>
            <Input
              placeholder="Nom..."
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
            <FormHelperText>Vous pouvez modifier le nom.</FormHelperText>
            <FormErrorMessage>Nom requis.</FormErrorMessage>
          </FormControl>
          {/* nom du Collaborateur -------------------------------------------*/}

          {/* prénom du Collaborateur DEBUT --------------------------------------*/}
          <FormControl isRequired mt={8} isInvalid={isErrorPrenom}>
            <FormLabel>Prénom</FormLabel>
            <Input
              placeholder="Prénom..."
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />
            <FormHelperText>Vous pouvez modifier le prénom.</FormHelperText>
            <FormErrorMessage>Prénom requis.</FormErrorMessage>
          </FormControl>
          {/* prénom du Collaborateur -------------------------------------------*/}
        </Box>
        <Box>
          <Stack spacing="24px" direction="row">
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleModifyCollaborateurClose()}
            >
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={() => handleSubmit()}>
              Modifier le Collaborateur
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

export default CollaborateurModify;
