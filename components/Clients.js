//-----------------------------------------
// CLIENTS
// Main Gestion Clients
//-----------------------------------------

// Functional Components
import ClientCreate from "./clients/ClientCreate";
import ClientModify from "./clients/ClientModify";
import ClientCard from "./clients/ClientCard";
//
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  useToast,
  IconButton,
  Input,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

function Clients() {
  // Les Etats
  const [clientsData, setClientsData] = useState([]);
  const [modifyRequestData, setModifyRequestData] = useState({});

  const [filter, setFilter] = useState("");

  // Les Etats pour les erreurs
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [showModifyClient, setShowModifyClient] = useState(false);

  // Les Toasts
  const toastDeleted = useToast();

  // Chargement des Clients
  useEffect(() => {
    // ${process.env.backend}
    axios.get(`${process.env.backend}/clients/all`).then((res) => {
      console.log("Data received =>", res.data);
      setClientsData(res.data.clients);
      setShowCreateClient(false);
    });
  }, []);

  // Refresh des Clients apres Creation-Suppression-Modification
  function getDataRefresh() {
    axios.get(`${process.env.backend}/clients/all`).then((res) => {
      console.log("Data received =>", res.data);
      setClientsData(res.data.clients);
    });
  }

  // Fonction pour Ajouter un Client
  function handleAjouterClient() {
    console.log("Click sur Ajouter un client");
    setShowCreateClient(true);
  }

  // Fonction retirer l'affichage de la Création d'un client
  // Declenchée par le composant ClientCreate
  function handleCreateClientClose() {
    setShowCreateClient(false);
    getDataRefresh();
  }

  // Fonction pour Supprimer un client
  function handleDeleteClient(idClient) {
    axios.delete(`${process.env.backend}/clients/${idClient}`).then((res) => {
      // Log du retour
      console.log("Data received back =>", res.data);

      if (res.data.result) {
        // API retourne result : true - le client a été supprimé
        toastDeleted({
          title: "Demande Suppression Client",
          description: "Nous avons bien supprimé le client.",
          status: "success",
          duration: 2000,
        });
      } else {
        // API retourne result : false - le client n'a pas été supprimé
        toastDeleted({
          title: "Demande Suppression Client",
          description: "Nous n'avons pas pu supprimer le client.",
          status: "error",
          duration: 2000,
        });
      }
      // on demande un refresh des data
      getDataRefresh();
    });
  }

  // Fonction pour Modifier un client
  function handleModifyClient(data) {
    console.log("Click sur Modifier un client");
    console.log("Props are =>", data);
    setModifyRequestData(data);
    setShowModifyClient(true);
  }

  // Fonction pour retirer l'affichage de la Modification du client
  // Declenchée par le composant ClientModify
  function handleModifyClientClose() {
    setShowModifyClient(false);
    getDataRefresh();
  }

  // Le Filtre sur les missions
  let clients;

  console.log("cliensData =>", clientsData);
  console.log("Filter =>", filter);

  if (filter) {
    // le filtre a une valeur de recherche
    let clientsPool = [...clientsData];
    clientsPool = clientsPool.filter((element) => {
      // filtre sur idClient
      if (
        element.idClient.toLowerCase().includes(filter.toLowerCase()) ||
        element.entreprise.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      }
    });
    console.log("clientPool =>", clientsPool);
    clients = clientsPool.map((data, i) => {
      return (
        <ClientCard
          key={i}
          {...data}
          handleDeleteClient={handleDeleteClient}
          handleModifyClient={handleModifyClient}
        />
      );
    });
  } else {
    // le filtre n'a pas de valeurs de recherche
    clients = clientsData.map((data, i) => {
      return (
        <ClientCard
          key={i}
          {...data}
          handleDeleteClient={handleDeleteClient}
          handleModifyClient={handleModifyClient}
        />
      );
    });
  }

  //

  ////////////////////////////
  return (
    <>
      <Flex
        paddingLeft={75}
        paddingRight={40}
        mt={10}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        boxSizing="border-box"
      >
        {/* DEBUT Colonne de Gauche - Pour Afficher Toutes Les Clients */}
        <Flex
          height="auto"
          width="40vw"
          p={8}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box w="40%" p={2}>
            <Heading color="gray.700" size="md">
              Gérer les Clients
            </Heading>
          </Box>
          <Box w="90%" p={2}>
            {/* Selection du Client -------------------------------------------*/}
            <HStack spacing="12px">
              <IconButton
                aria-label="Search database"
                shadow="md"
                icon={<SearchIcon />}
              />
              <Input
                shadow="md"
                placeholder="Rechercher par idClient ou entreprise"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
            </HStack>

            {/*  de Client FIN --------------------------------------------- */}
          </Box>
          <Box w="50%" p={4}></Box>
          <Box w="90%">
            <Stack spacing={15} direction="column">
              {/*  ajouter Client DEBUT ----------- */}
              <SimpleGrid columns={2} spacing={10}>
                <Box
                  p={5}
                  height="auto"
                  shadow="md"
                  background="gray.100"
                  rounded={6}
                >
                  <Flex flexDirection="column">
                    <Box>
                      <Heading fontSize="l" color="black">
                        Nouveau Client
                      </Heading>
                    </Box>
                    <Box height="auto"></Box>
                    <Box>
                      <Flex justifyContent="end">
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={handleAjouterClient}
                        >
                          Ajouter
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                {/*  ajouter Client FIN ------------ */}

                {/*  insertion des Clients DEBUT --- */}
                {clients}
                {/*  insertion des Clients FIN --- */}
              </SimpleGrid>
            </Stack>
          </Box>
        </Flex>

        {/* DEBUT Colonne de Droite - Pour Composant Création ou Modification du Client */}
        <Flex
          height="auto"
          width="20vw"
          p={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/*  ajouter CreateClient DEBUT ----------- */}
          {showCreateClient && (
            <ClientCreate handleCreateClientClose={handleCreateClientClose} />
          )}
          {/*  ajouter CreateClient FIN ----------- */}

          {/*  ajouter ModifyClient DEBUT ----------- */}
          {showModifyClient && (
            <ClientModify
              handleModifyClientClose={handleModifyClientClose}
              {...modifyRequestData}
            />
          )}
          {/*  ajouter CreateClient FIN ----------- */}
        </Flex>
      </Flex>
    </>
  );
}

export default Clients;
