//-----------------------------------------
// MISSIONS
// Main de la Gestion des Missions
//-----------------------------------------
// functional component
import MissionCreate from "./missions/MissionCreate";
import MissionModify from "./missions/MissionModify";
import MissionCard from "./missions/MissionCard";
//
import { useEffect, useState } from "react";
import axios from "axios";

// UI
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Heading,
  Stack,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";

function Missions() {
  // Les Etats
  const [missionsData, setMissionsData] = useState([]);
  const [modifyRequestData, setModifyRequestData] = useState({});
  const [client, setClient] = useState("");
  const [idClient, setIdClient] = useState("");
  const [entreprise, setEntreprise] = useState("");

  // Les Etats pour les erreurs
  const [isErrorClient, setIsErrorClient] = useState(false);
  const [showCreateMission, setShowCreateMission] = useState(false);
  const [showModifyMission, setShowModifyMission] = useState(false);
  const [deleteRequestedFor, setDeleteRequestedFor] = useState("");

  // Les Etats de gestion
  const [refreshRequested, setRefreshRequested] = useState(false);

  // Les Toasts
  const toastDeleted = useToast();

  // Changement du Client
  useEffect(() => {
    if (client !== "") {
      console.log("Client est =>", client);
      axios.get(`${process.env.backend}/missions/all`).then((res) => {
        console.log("Data received =>", res.data);
        let sortedmissions = res.data.missions.sort((a, b) => {
          return new Date(a.echeance) - new Date(b.echeance);
        });

        setMissionsData(sortedmissions);
      });
    }

    if (client === "") {
      setShowCreateMission(false);
    }
  }, [client]);

  // Changement du Client
  function getDataRefresh() {
    console.log("Refreshrested est =>", refreshRequested);
    axios.get(`${process.env.backend}/missions/all`).then((res) => {
      console.log("Data received =>", res.data);
      setMissionsData(res.data.missions);
    });
  }

  // Fonction pour Ajouter une mission
  function handleAjouterMission() {
    console.log("Click sur Ajouter une mission");
    console.log("idClient is =>", idClient);
    console.log("entreprise is =>", entreprise);
    const filterArray = client.split("-");
    setIdClient(filterArray[0]);
    setEntreprise(filterArray[1]);
    setShowCreateMission(true);
  }

  // Fonction retirer l'affichage de la Création de mission
  // Declenchée par le composant CreateMission
  function handleCreateMissionClose() {
    setShowCreateMission(false);
    getDataRefresh();
  }

  // Fonction pour Supprimer une mission
  function handleDeleteMission(idMission) {
    // on va demander à l'utilisateur de clicker 2 fois sur supprimer
    // pour réllement supprimer la mission dans la BD
    if (deleteRequestedFor === idMission) {
      console.log("Seconde fois pour la meme mission");
      // à la seconde demande on fait la requete de Delete
      axios
        .delete(`${process.env.backend}/missions/${idMission}`)
        .then((res) => {
          // Log du retour
          console.log("Data received back =>", res.data);

          if (res.data.result) {
            // API retourne result : tue - la mission a été supprimée
            toastDeleted({
              title: "Demande Suppression Mission",
              description: "Nous avons bien supprimé la mission.",
              status: "success",
              duration: 2000,
            });
          } else {
            // API retourne result : false - la mission n'a pas été supprimée
            toastDeleted({
              title: "Demande Suppression Mission",
              description: "Nous n'avons pas pu supprimer la mission.",
              status: "error",
              duration: 2000,
            });
          }
          // on demande un refresh des data
          getDataRefresh();
        });
    } else {
      console.log("Click sur Delete idMission", idMission);
      setDeleteRequestedFor(idMission);
    }
  }

  // Fonction pour Modifier une mission
  function handleModifyMission(data) {
    console.log("Click sur Modifier une mission");
    console.log("Props are =>", data);
    setModifyRequestData(data);
    setShowModifyMission(true);
  }

  // Fonction pour retirer l'affichage de la Modification de mission
  // Declenchée par le composant ModifyMission
  function handleModifyMissionClose() {
    setShowModifyMission(false);
    getDataRefresh();
  }

  // Le Filtre sur les missions
  let missions;

  if (client !== "") {
    const filterArray = client.split("-");
    //console.log("Client is =>", filterArray[0]);

    let missionsPool = [...missionsData];
    missionsPool = missionsPool.filter(
      (element) => element.idClient === filterArray[0]
    );
    missions = missionsPool.map((data, i) => {
      return (
        <MissionCard
          key={i}
          {...data}
          handleDeleteMission={handleDeleteMission}
          handleModifyMission={handleModifyMission}
        />
      );
    });
    //
  }

  ////////////////////////////
  return (
    <>
      <Flex
        // height="99vh"
        // width="80vw"
        paddingLeft={75}
        paddingRight={40}
        mt={10}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="center"
        boxSizing="border-box"
      >
        {/* DEBUT Colonne de Gauche - Pour Afficher Toutes Les Missions d'un Client */}
        <Flex
          height="auto"
          width="40vw"
          p={8}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box w="75%" p={2}>
            <Heading color="gray.700" size="md">
              Gérer les Missions des Clients
            </Heading>
          </Box>
          <Box w="75%" p={2}>
            {/* Selection du Client -------------------------------------------*/}
            <FormControl isRequired isInvalid={isErrorClient}>
              <FormLabel>Client</FormLabel>
              <Select
                placeholder="Mon Client est..."
                value={client}
                onChange={(event) => setClient(event.target.value)}
              >
                <option>CTL01-Beaubois SAS</option>
                <option>CTL02-Bellemontagne SAS</option>
                <option>CTL03-Jolimont SAS</option>
                <option>CTL04-Bellevue SAS</option>
                <option>CTL05-Boucher Fin Gourmet SAS</option>
                <option>CTL06-Coiffeur Delarue SAS</option>
                <option>CTL07-Garage Bontravail SAS</option>
                <option>CTL06-Agence du Soleil SAS</option>
              </Select>
              <FormHelperText>
                Choisir le client dont vous voulez gérer les missions.
              </FormHelperText>
              <FormErrorMessage>Client requis.</FormErrorMessage>
            </FormControl>
            {/*  de Client FIN --------------------------------------------- */}
          </Box>
          <Box w="50%" p={2}></Box>
          <Box w="75%" p={2}>
            <Stack spacing={15} direction="column">
              {/*  ajouter Mission DEBUT ----------- */}
              {client !== "" && (
                <Box
                  p={5}
                  height="auto"
                  shadow="md"
                  background="gray.100"
                  rounded={6}
                >
                  <Heading fontSize="l" color="black">
                    Nouvelle Mission
                  </Heading>
                  <HStack justifyContent="end">
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={handleAjouterMission}
                    >
                      Ajouter
                    </Button>
                  </HStack>
                </Box>
              )}

              {/*  ajouter Mission FIN ------------ */}

              {/*  insertion des Missions DEBUT --- */}
              {missions}
              {/*  insertion des Missions FIN --- */}
            </Stack>
          </Box>
        </Flex>

        {/* DEBUT Colonne de Droite - Pour Composant Création ou Modification de la Mission */}
        <Flex
          height="auto"
          width="15vw"
          p={6}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/*  ajouter CreateMissions DEBUT ----------- */}
          {showCreateMission && (
            <MissionCreate
              idClient={idClient}
              entreprise={entreprise}
              handleCreateMissionClose={handleCreateMissionClose}
            />
          )}
          {/*  ajouter CreateMission FIN ----------- */}

          {/*  ajouter ModifyMission DEBUT ----------- */}
          {showModifyMission && (
            <MissionModify
              handleModifyMissionClose={handleModifyMissionClose}
              {...modifyRequestData}
            />
          )}
          {/*  ajouter CreateMission FIN ----------- */}
        </Flex>
      </Flex>
    </>
  );
}

export default Missions;
