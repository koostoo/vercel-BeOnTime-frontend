//-----------------------------------------------------
// Composant : ClientCard
// Importé par : Clients
//-----------------------------------------------------

// UI
import { Box, Heading, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function ClientCard(props) {
  // Inverse Data Flow - handleModifyClient
  const handleModifyClient = () => {
    props.handleModifyClient(props);
  };

  // Inverse Data Flow - handleModifyClient
  const handleDeleteClient = () => {
    props.handleDeleteClient(props.idClient);
  };

  return (
    <Box
      // p={4}
      // height='160'
      // width='150'
      shadow="lg"
      background="gray.50"
      rounded={6}
    >
      <Flex flexDirection="column">
        <Box pt={4}>
          <Heading fontSize="l" color="black" pl={4}>
            {props.entreprise}
          </Heading>
        </Box>
        <Box height="auto" pt={2} pl={4}>
          <Text fontSize="l" color="black">
            {props.idClient}
          </Text>
        </Box>
        <Box>
          <Flex justifyContent="flex-end">
            <IconButton
              size="lg"
              colorScheme="teal"
              variant="ghost"
              icon={<EditIcon />}
              onClick={() => handleModifyClient()}
            />
            <IconButton
              size="lg"
              colorScheme="teal"
              variant="ghost"
              icon={<DeleteIcon />}
              onDoubleClick={() => handleDeleteClient()}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ClientCard;
