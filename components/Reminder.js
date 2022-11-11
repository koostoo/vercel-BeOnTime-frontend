// Librairies
import React, { useState } from "react";
// UI
import { Heading, VStack, HStack, Button, Input } from "@chakra-ui/react";

//--------------------------------------------------------
// REMINDER
// Main Gestion du Reminder
//--------------------------------------------------------
// Component
import Task from "./reminder/Task";

function Reminder() {
  // States
  const [tasks, setTasks] = useState([]);

  const [input, setInput] = useState("");

  // Fonctions - méthodes
  // Permet de gérer la suppression d'une taches
  const removeClickedHandler = (index) => {
    // console.log(index);
    const newTasks = [...tasks]; // permet de retirer une tache et de laisser toutes les autres
    newTasks.splice(index, 1); // permet, à l'index de notre choix, de retirer un élément
    setTasks(newTasks); // mise à jour du state
  };

  // Permet de gérer si une tache a été effectuée
  const doneClickedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    // Dans mes nouvelles tache, à l'index qui a été cliqué, on va passer la propriété done qui est = à notre state(tasks),
    //la tache qui a été cliquée puis done (qui va renvoyer false ou true) et on ajoute '!' car on veut son contraire
    // ainsi, si la tache n'est pas checkée et qu'on clique dessus... on va la checker / si deja checkée, on veut la dé-checkée
    setTasks(newTasks); // mise à jour du state
  };

  // Permet d'ajouter une nouvelle tache
  const submittedTaskHandler = (event) => {
    event.preventDefault();
    // console.log(event);
    // permet d'empecher l'envoi du formulaire (annule le click natif)
    // ça bloque l'event par défaut qui permet d'envoyer le formulaire en cliquant sur la touche 'entrée'

    // check sur la valeur de l'input

    if (input.length > 0) {
      // ajouter la tache
      const newTask = {
        content: input,
        done: false,
      };
      setTasks([...tasks, newTask]); // on récupère toutes les taches + la nouvelle
      setInput(""); // permet de vider l'input pour pas que ce qu'on a tapé dedans reste affiché
    }
  };

  const changedFormHandler = (event) => {
    setInput(event.target.value); // récupère le contenu de l'input
  };

  // Variables
  // Taches affichées
  let tasksDisplayed = tasks.map((task, index) => {
    return (
      <Task
        done={task.done} // pour savoir si la tache est réalisée ou non
        content={task.content}
        key={index}
        removeClicked={() => removeClickedHandler(index)}
        doneClicked={() => doneClickedHandler(index)}
      />
    );
  });

  return (
    <VStack p={4}>
      <Heading
        color="white"
        textAlign="center"
        mb="1"
        mt="4"
        fontWeight="bold"
        size="lg"
        bgGradient="linear(to-r, blue.300, blue.200, blue.300)"
        bgClip="text"
      >
        Reminder
      </Heading>

      <form onSubmit={(e) => submittedTaskHandler(e)}>
        <HStack mt="8">
          <Input
            type="text"
            variant="filled"
            color="white"
            px="1"
            value={input}
            onChange={(e) => changedFormHandler(e)}
            placeholder="Ajouter un rappel..."
          />
          <Button colorScheme="blue" px="3" type="submit">
            Ajouter
          </Button>
        </HStack>
      </form>

      {tasksDisplayed}
    </VStack>
  );
}
export default Reminder;

// onSubmit permet de détecter l'envoi du formulaire
