//------------------------------------------------------
// Page : Clients
//------------------------------------------------------
// style
import styles from "../styles/Clients.module.css";
// functional components
import Clients from "../components/Clients";

function ClientsPage() {
  return (
    <div className={styles.midleContainer}>
      <Clients />
    </div>
  );
}

export default ClientsPage;
