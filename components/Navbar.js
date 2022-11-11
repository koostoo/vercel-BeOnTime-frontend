//--------------------------------------------------------
// NAVBAR
// Main Gestion de la Navbar
//--------------------------------------------------------

import Link from "next/link";
import { useRouter } from "next/router";

// functional component
import NavItem from "./navbar/NavItem";
// UI
import { Flex, IconButton, Divider, Avatar } from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUsers,
  FiBookOpen,
} from "react-icons/fi";

// Importe Reducer user
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

import React, { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {
    dispatch(logout());
    //console.log("LogoutDone");
  };

  // Redirect to /login if not logged in
  const router = useRouter();

  if (!user.token) {
    router.push("/");
  }

  const [navSize, changeNavSize] = useState("large");

  return (
    <Flex
      pos="sticky"
      left="5"
      bg="#133559"
      color="white"
      paddingTop="2.5vh"
      paddingBottom="2.5vh"
      w={navSize == "small" ? "75px" : "250px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />

        <Link href="/dashboard">
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Tableau de bord"
          ></NavItem>
        </Link>
        <Link href="/majournee">
          <NavItem
            navSize={navSize}
            icon={FiCalendar}
            title="Ma Journée"
          ></NavItem>
        </Link>
        <Link href="/missions">
          <NavItem
            navSize={navSize}
            icon={FiBookOpen}
            title="Missions"
          ></NavItem>
        </Link>
        <Link href="/clients">
          <NavItem navSize={navSize} icon={FiUsers} title="Clients"></NavItem>
        </Link>
        <Link href="/collaborateurs">
          <NavItem
            navSize={navSize}
            icon={FiUsers}
            title="Collaborateurs"
          ></NavItem>
        </Link>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center" fontSize="lg">
          <Avatar size="sm" src={user.picture} />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <button onClick={() => handleLogout()}>Se déconnecter</button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
