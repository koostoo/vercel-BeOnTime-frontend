//-----------------------------------------------------
// Composant : Task
// Importé par : Reminder
//-----------------------------------------------------

import React from "react";
// Style
import styles from "../../styles/Task.module.css";
// UI
import {
  VStack,
  IconButton,
  HStack,
  StackDivider,
  Spacer,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

function Task(props) {
  // JSX
  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      alignItems="stretch"
    >
      <div className={styles.task}>
        <HStack>
          {props.done ? (
            <div className={styles.content} onClick={props.doneClicked}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="lightblue"
                viewBox="0 0 16 16"
              >
                {/* checkbox checkée */}
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
              </svg>
              {/* del permet de mettre un trait sur les taches réalisées */}
              <del>{props.content}</del>
            </div>
          ) : (
            <div className={styles.content} onClick={props.doneClicked}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="lightblue"
                viewBox="0 0 16 16"
              >
                {/* checkbox vide */}
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              </svg>
              <>{props.content}</>
            </div>
          )}
          <Spacer />
          <IconButton
            icon={<FaTrash />}
            isRound="true"
            bgColor="blue.400"
            onClick={props.removeClicked}
          />
        </HStack>
      </div>
    </VStack>
  );
}

export default Task;
