// Style
import styles from "../styles/MaJournee.module.css";
// functional components
import MesMissions from "../components/majournee/MesMissions";
import MaJournee from "../components/majournee/MaJournee";

function MaJourneePage() {
  return (
    <div className={styles.container}>
      <div className={styles.midleLeft}>
        <MesMissions />
      </div>
      <div className={styles.midleRight}>
        <MaJournee />
      </div>
    </div>
  );
}

export default MaJourneePage;
