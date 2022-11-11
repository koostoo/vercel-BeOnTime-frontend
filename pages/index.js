//--------------------------------------------
// index.js : Point d'entrée de l'application
// Renvoie sur le Login
//--------------------------------------------
import Head from "next/head";
// functional components
import Login from "../components/Login";

function Index() {
  return (
    <>
      <Head>
        <title>BeOnTime</title>
      </Head>
      <Login />
    </>
  );
}

export default Index;
