//--------------------------------------------------------
// Layout.js - spécifications Next.js
// Main Gestion du Layout de l'application
//--------------------------------------------------------

// With NavBar
// functional components
import Navbar from "./Navbar";
import Reminder from "./Reminder";
// style
import styles from "../styles/Layout.module.css";
// UI
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <div className={styles.grid}>
      <Flex>
        <Navbar />
      </Flex>
      <div className={styles.center}>{children}</div>
      <div className={styles.reminder}>
        <Reminder />
      </div>
    </div>
  );
};

export default Layout;
