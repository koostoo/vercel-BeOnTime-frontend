//-----------------------------------------------------
// Composant : ClientCreate
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
  HStack,
} from "@chakra-ui/react";

function ClientCreate(props) {
  // states passés en Props
  const [idClient, setIdClient] = useState("");
  const [entreprise, setEntreprise] = useState("");

  // Les flags pour les erreurs
  const [isErrorIdClient, setIsErrorIdClient] = useState(false);
  const [isErrorEntreprise, setIsErrorEntreprise] = useState(false);

  // Les Toasts
  const toastCreate = useToast();

  // HandleSubmit ///////////////////////////////////////////////////////DEBUT
  const handleSubmit = () => {
    let validated = true;
    // validation :idClient
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

    // Si les champs sont validés
    // on va faire appel API de Création
    if (validated === true) {
      // on prepare le body
      const body = {
        idClient: idClient,
        entreprise: entreprise,
      };

      console.log("Body du post =>", body);

      // on fait le post
      // ${process.env.backend}
      axios
        .post(`${process.env.backend}/clients/`, JSON.stringify(body), {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : true - le client a été créé
            toastCreate({
              title: "Demande Création Client",
              description: "Nous avons bien créé le Client.",
              status: "success",
              duration: 3000,
            });
          } else {
            // API retourne result : false - le client n'a pas été créé
            toastCreate({
              title: "Demande Création Client",
              description: "Nous n'avons pas pu créer le Client.",
              status: "error",
              duration: 3000,
            });
          }

          // on demande l'appel de handleCreateyClientClose
          handleCreateClientClose();
          //
        });
    }
  };
  // HandleSubmit ////////////////FIN

  // Inverse Data Flow handleCreateClientClose //////DEBUT
  const handleCreateClientClose = () => {
    props.handleCreateClientClose();
  };
  // HandleCreateClientClose ////////////////////////FIN

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
            {/* idClient du Client DEBUT ----------------------------------------*/}
            <center>
              <Heading size="md" color="black">
                <Text p={2} color="black">
                  Création d'un Client
                </Text>
              </Heading>
            </center>
            <FormControl isRequired mt={5} isInvalid={isErrorIdClient}>
              <FormLabel>idClient</FormLabel>
              <Input
                placeholder="CTL01"
                value={idClient}
                onChange={(event) => setIdClient(event.target.value)}
              />
              <FormHelperText>
                Saisir un id unique qui sera attribué au client.
              </FormHelperText>
              <FormErrorMessage>idClient requis.</FormErrorMessage>
            </FormControl>

            {/* idClient du Client FIN ----------------------------------------- */}

            {/* entreprise du Client DEBUT --------------------------------------*/}
            <FormControl isRequired mt={8} isInvalid={isErrorEntreprise}>
              <FormLabel>Entreprise</FormLabel>
              <Input
                placeholder="Beaubois SAS"
                value={entreprise}
                onChange={(event) => setEntreprise(event.target.value)}
              />
              <FormHelperText>
                Saisir le nom de l'entreprise du client.
              </FormHelperText>
              <FormErrorMessage>Entrerise requise.</FormErrorMessage>
            </FormControl>
            {/* entreprise du Client -------------------------------------------*/}
          </Box>
          <Box>
            <HStack spacing="24px" align="center" justifyContent="center">
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => handleCreateClientClose()}
              >
                Annuler
              </Button>
              <Button colorScheme="teal" onClick={() => handleSubmit()}>
                Créer le Client
              </Button>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ClientCreate;
