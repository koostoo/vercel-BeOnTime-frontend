//---------------------------------------------------------------------
// Page : Collaborateurs
//---------------------------------------------------------------------
// style
import styles from "../styles/Collaborateurs.module.css";
// functional components
import Collaborateurs from "../components/Collaborateurs";

function CollaborateursPage() {
  return (
    <div className={styles.midleContainer}>
      <Collaborateurs />
    </div>
  );
}

export default CollaborateursPage;
