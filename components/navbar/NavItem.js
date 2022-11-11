//-----------------------------------------------------
// Composant : NavItem
// Importé par : Navbar
//-----------------------------------------------------

import React from "react";
// UI
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, active, navSize }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          // backgroundColor={active && '#AEC8CA'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#012549" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex alignItems="center">
              <Icon
                as={icon}
                fontSize="lg"
                color={active ? "white" : "white"}
              />
              <Text
                ml={5}
                color="white"
                fontSize="lg"
                display={navSize == "small" ? "none" : "flex"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
