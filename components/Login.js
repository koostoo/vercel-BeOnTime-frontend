//--------------------------------------------------------
// LOGIN
// Main Gestion du login
//--------------------------------------------------------

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// reducer
import { login } from "../reducers/user";
// UI
import { Image } from "@chakra-ui/react";
import { Button, Flex, Heading, Input, Center } from "@chakra-ui/react";

function Login() {
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  const router = useRouter();

  // Méthodes
  const handleSubmit = () => {
    console.log("Fetch =>", process.env.backend);

    fetch(`${process.env.backend}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result &&
          dispatch(
            login({
              token: data.token,
              username: data.username,
              picture: data.picture,
              prenom: data.prenom,
              isManager: data.isManager,
            })
          );
        if (user.token) {
          // console.log('user token found');
          router.push("/dashboard");
        }
      });
  };

  return (
    <Flex min-width="100vw" min-height="100vh">
      <Center>
        <Image
          src="/bg.jpeg"
          width="100vw"
          height="100vh"
          display="flex"
          alt="geometrical background image"
          position="absolute"
        ></Image>

        <Flex
          height="100vh"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <Flex direction="column" p={14} rounded={6}>
            <Center>
              <Heading
                bgGradient="linear(to-r, blue.700, teal.600, teal.700, blue.900)"
                bgClip="text"
                position="absolute"
                mb={20}
                fontSize={40}
              >
                Connectez-vous à BeOnTime
              </Heading>
            </Center>
            <Flex flexDirection="column">
              <Input
                placeholder="Username"
                _placeholder={{ opacity: 1, color: "black" }}
                variant="filled"
                mt={38}
                fontSize="large"
                mb={6}
                type="email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Input
                placeholder="Password"
                _placeholder={{ opacity: 1, color: "black" }}
                variant="filled"
                mb={14}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button
                mb={6}
                size="lg"
                bgGradient="linear(to-r, blue.600, blue.400, blue.400, blue.600)"
                color="blue.900"
                onClick={() => handleSubmit()}
                mt={-2}
              >
                Se connecter
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}

export default Login;
