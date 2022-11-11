//-----------------------------------------------------
// Composant : CollaborateurCard
// Importé par : Collaborateurs
//-----------------------------------------------------

// UI
import {
  Box,
  Heading,
  HStack,
  VStack,
  Flex,
  IconButton,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
//import { useState } from "react";

function CollaborateurCard(props) {
  // Inverse Data Flow - handleModifyCollaborateur
  const handleModifyCollaborateur = () => {
    props.handleModifyCollaborateur(props);
  };

  // Inverse Data Flow - handleModifyCollaborateur
  const handleDeleteCollaborateur = () => {
    props.handleDeleteCollaborateur(props.username);
  };

  return (
    <Box
      pt={6}
      pl={6}
      height="170"
      width="150"
      shadow="lg"
      background="gray.50"
      rounded={6}
    >
      <Flex flexDirection="column">
        <Box>
          <HStack spacing="20px">
            <Avatar size="xl" src={props.picture} />
            <VStack>
              <Heading fontSize="l" color="black">
                {props.nom} {props.prenom}
              </Heading>
              <Text color="gray.400">{props.username}</Text>
            </VStack>
          </HStack>
        </Box>

        <Box>
          <Flex justifyContent="flex-end">
            <IconButton
              size="lg"
              colorScheme="teal"
              variant="ghost"
              icon={<EditIcon />}
              onClick={() => handleModifyCollaborateur()}
            />
            <IconButton
              size="lg"
              colorScheme="teal"
              variant="ghost"
              icon={<DeleteIcon />}
              onDoubleClick={() => handleDeleteCollaborateur()}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CollaborateurCard;
