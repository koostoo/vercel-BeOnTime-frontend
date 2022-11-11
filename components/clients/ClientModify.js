//-----------------------------------------------------
// Composant : ClientModify
// Importé par : Clients
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

function ClientModify(props) {
  console.log("Composant Modify Client");
  console.log("Props are", props);

  //on met a defaut les states
  const [idClient, setIdClient] = useState(props.idClient);
  const [entreprise, setEntreprise] = useState(props.entreprise);

  // Les flags pour les erreurs
  const [isErrorIdClient, setIsErrorIdClient] = useState(false);
  const [isErrorEntreprise, setIsErrorEntreprise] = useState(false);

  // Les Toasts
  const toastModify = useToast();

  // HandleSubmit ////////////////////////DEBUT
  const handleSubmit = () => {
    let validated = true;

    // validation idClient
    if (idClient === "") {
      setIsErrorIdClient(true);
      validated = false;
    } else {
      setIsErrorIdClient(false);
    }

    // validation :entreprise
    if (entreprise === "") {
      setIsErrorEntreprise(true);
      validated = false;
    } else {
      setIsErrorEntreprise(false);
    }

    console.log("validated =>", validated);
    const client = {
      idClient,
      entreprise,
    };
    console.log("le client est => ", client);
    //alert(JSON.stringify(client));

    // Si les champs validés
    // on va faire appel API de Modification
    if (validated === true) {
      // on prepare le body avec les informations
      const body = {
        idClient: idClient,
        entreprise: entreprise,
      };

      console.log("Body du post =>", body);

      // on fait le post

      axios
        .put(
          `${process.env.backend}/clients/${idClient}`,
          JSON.stringify(body),
          {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }
        )
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : true - le client a été modifié
            toastModify({
              title: "Demande Modification Client",
              description: "Nous avons bien modifié le client.",
              status: "success",
              duration: 3000,
            });
          } else {
            // API retourne result : false - le client n'a pas été modifié
            toastModify({
              title: "Demande Modification Client",
              description: "Nous n'avons pas pu modifier le client.",
              status: "error",
              duration: 3000,
            });
          }

          // on demande l'appel de handleModifyMissionClose
          handleModifyClientClose();
        });
    }
  };
  // HandleSubmit ////////////////////////FIN

  // Inverse Data Flow
  // handleModifyClientClose //////DEBUT
  const handleModifyClientClose = () => {
    props.handleModifyClientClose();
  };
  // HandleModifyClientClose ////////////////////////FIN

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
          {/* idClient du Client DEBUT ----------------------------------------*/}
          <center>
            <Heading size="md">
              <Text p={3}>Modification d'un Client</Text>
            </Heading>
          </center>
          <FormControl isRequired mt={5} isInvalid={isErrorIdClient}>
            <FormLabel>idClient du Client</FormLabel>
            <Input
              placeholder="CTL01"
              isReadOnly="true"
              value={idClient}
              onChange={(event) => setIdClient(event.target.value)}
            />
            <FormHelperText>
              Vous ne pouvez pas modifier l'id du client.
            </FormHelperText>
            <FormErrorMessage>idClient requis.</FormErrorMessage>
          </FormControl>

          {/* idClient du Client FIN ----------------------------------------- */}

          {/* entreprise du Client DEBUT --------------------------------------*/}
          <FormControl isRequired mt={8} isInvalid={isErrorEntreprise}>
            <FormLabel>Entreprise du Client</FormLabel>
            <Input
              placeholder="Beaubois SAS"
              value={entreprise}
              onChange={(event) => setEntreprise(event.target.value)}
            />
            <FormHelperText>Vous pouvez modifier l'entreprise.</FormHelperText>
            <FormErrorMessage>Libellé requis.</FormErrorMessage>
          </FormControl>
          {/* entreprise du Client -------------------------------------------*/}
        </Box>
        <Box>
          <Stack spacing="24px" direction="row">
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => handleModifyClientClose()}
            >
              Annuler
            </Button>
            <Button colorScheme="teal" onClick={() => handleSubmit()}>
              Modifier le Client
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}

export default ClientModify;
