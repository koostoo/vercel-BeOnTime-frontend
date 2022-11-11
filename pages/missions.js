//------------------------------------------------------
// Page : Missions
//------------------------------------------------------
// style
import styles from "../styles/Missions.module.css";
// functional Components
import Missions from "../components/Missions";

function MissionsPage() {
  return (
    <div className={styles.midleContainer}>
      <Missions />
    </div>
  );
}

export default MissionsPage;
