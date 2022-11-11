//-----------------------------------------
// COLLABORATEURS
// Main Gestion Collaborateurs
//-----------------------------------------

// Functional Components
import CollaborateurCreate from "./collaborateurs/CollaborateurCreate";
import CollaborateurModify from "./collaborateurs/CollaborateurModify";
import CollaborateurCard from "./collaborateurs/CollaborateurCard";
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

function Collaborateurs() {
  // Les Etats
  const [collaborateursData, setCollaborateursData] = useState([]);
  const [modifyRequestData, setModifyRequestData] = useState({});

  const [filter, setFilter] = useState("");

  // Les Etats pour les erreurs
  const [showCreateCollaborateur, setShowCreateCollaborateur] = useState(false);
  const [showModifyCollaborateur, setShowModifyCollaborateur] = useState(false);

  // Les Toasts
  const toastDeleted = useToast();

  // Chargement des Collaborateurs
  useEffect(() => {
    axios.get(`${process.env.backend}/users/all`).then((res) => {
      console.log("Data received =>", res.data);
      setCollaborateursData(res.data.users);
      setShowCreateCollaborateur(false);
    });
  }, []);

  // Refresh des Collaborateurs apres Creation-Suppression-Modification
  function getDataRefresh() {
    axios.get(`${process.env.backend}/users/all`).then((res) => {
      console.log("Data received =>", res.data);
      setCollaborateursData(res.data.users);
    });
  }

  // Fonction pour Ajouter un Collaborateur
  function handleAjouterCollaborateur() {
    console.log("Click sur Ajouter un collaborateur");
    setShowCreateCollaborateur(true);
  }

  // Fonction retirer l'affichage de la Création d'un collaborateur
  // Declenchée par le composant CollaborateurCreate
  function handleCreateCollaborateurClose() {
    setShowCreateCollaborateur(false);
    getDataRefresh();
  }

  // Fonction pour Supprimer un collaborateur
  function handleDeleteCollaborateur(username) {
    console.log("Demande Suppression Collaborateur=>", username);
    axios.delete(`${process.env.backend}/users/${username}`).then((res) => {
      // Log du retour
      console.log("Data received back =>", res.data);

      if (res.data.result) {
        // API retourne result : true - le collaborateur a été supprimé
        toastDeleted({
          title: "Demande Suppression Collaborateur",
          description: "Nous avons bien supprimé le collaborateur.",
          status: "success",
          duration: 2000,
        });
      } else {
        // API retourne result : false - le collaborateur n'a pas été supprimé
        toastDeleted({
          title: "Demande Suppression Collaborateur",
          description: "Nous n'avons pas pu supprimer le collaborateur.",
          status: "error",
          duration: 2000,
        });
      }
      // on demande un refresh des data
      getDataRefresh();
    });
  }

  // Fonction pour Modifier un collaborateur
  function handleModifyCollaborateur(data) {
    console.log("Click sur Modifier un collaborateur");
    console.log("Props are =>", data);
    setModifyRequestData(data);
    setShowModifyCollaborateur(true);
  }

  // Fonction pour retirer l'affichage de la Modification du collaborateur
  // Declenchée par le composant CollaboratuerModify
  function handleModifyCollaborateurClose() {
    setShowModifyCollaborateur(false);
    getDataRefresh();
  }

  // Le Filtre sur les missions
  let collaborateurs;

  console.log("collaborateursData =>", collaborateursData);
  console.log("Filter =>", filter);

  if (filter) {
    // le filtre a une valeur de recherche
    let collaborateursPool = [...collaborateursData];
    collaborateursPool = collaborateursPool.filter((element) => {
      // filtre sur idCollab - nom - prenom
      if (
        element.username.toLowerCase().includes(filter.toLowerCase()) ||
        element.nom.toLowerCase().includes(filter.toLowerCase()) ||
        element.prenom.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      }
    });
    console.log("collaborateursPool =>", collaborateursPool);
    collaborateurs = collaborateursPool.map((data, i) => {
      return (
        <CollaborateurCard
          key={i}
          {...data}
          handleDeleteCollaborateur={handleDeleteCollaborateur}
          handleModifyCollaborateur={handleModifyCollaborateur}
        />
      );
    });
  } else {
    // le filtre n'a pas de valeurs de recherche
    collaborateurs = collaborateursData.map((data, i) => {
      return (
        <CollaborateurCard
          key={i}
          {...data}
          handleDeleteCollaborateur={handleDeleteCollaborateur}
          handleModifyCollaborateur={handleModifyCollaborateur}
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
        // paddingRight={40}
        mt={10}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        boxSizing="border-box"
      >
        {/* DEBUT Colonne de Gauche - Pour Afficher Toutes Les Collaborateurs */}
        <Flex
          height="auto"
          width="38vw"
          pt={8}
          pl={8}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box w="50%" p={2}>
            <Heading color="gray.700" size="md">
              Gérer les Collaborateurs
            </Heading>
          </Box>
          <Box w="90%" p={4}>
            {/* Selection du Collaborateur -------------------------------------------*/}
            <HStack spacing="12px">
              <IconButton
                aria-label="Search database"
                shadow="md"
                icon={<SearchIcon />}
              />
              <Input
                shadow="md"
                placeholder="Rechercher par idCollab, nom, prenom"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
            </HStack>

            {/*  de Collaboorateur FIN --------------------------------------------- */}
          </Box>
          <Box w="50%" p={4}></Box>
          <Box w="90%" p={2}>
            <Stack spacing={15} direction="column">
              {/*  ajouter Collaborateur DEBUT ----------- */}
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
                        Nouveau Collaborateur
                      </Heading>
                    </Box>
                    <Box height="80px"></Box>
                    <Box>
                      <Flex justifyContent="end">
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          onClick={handleAjouterCollaborateur}
                        >
                          Ajouter
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                {/*  ajouter Collaborateur FIN ------------ */}

                {/*  insertion des Collaborateurs DEBUT --- */}
                {collaborateurs}
                {/*  insertion des Collaborateurs FIN --- */}
              </SimpleGrid>
            </Stack>
          </Box>
        </Flex>

        {/* DEBUT Colonne de Droite - Pour Composant Création ou Modification du Collaborateur */}
        <Flex
          height="100vh"
          width="30vw"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {/*  ajouter CreateCollaborateur DEBUT ----------- */}
          {showCreateCollaborateur && (
            <CollaborateurCreate
              handleCreateCollaborateurClose={handleCreateCollaborateurClose}
            />
          )}
          {/*  ajouter CreateCollaborateur FIN ----------- */}

          {/*  ajouter ModifyCollaborateur DEBUT ----------- */}
          {showModifyCollaborateur && (
            <CollaborateurModify
              handleModifyCollaborateurClose={handleModifyCollaborateurClose}
              {...modifyRequestData}
            />
          )}
          {/*  ajouter modifyCollaborateur FIN ----------- */}
        </Flex>
      </Flex>
    </>
  );
}

export default Collaborateurs;
