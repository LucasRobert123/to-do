import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find((t) => t.title === newTaskTitle);

    if (task) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    setTasks([
      ...tasks,
      { id: new Date().getTime(), title: newTaskTitle, done: false },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prevState) =>
      prevState.map((state) => {
        if (state.id === id) {
          return {
            ...state,
            done: !state.done,
          };
        }
        return state;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((prevState) => prevState.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  const handleEditTask = (taskId: number, taskNewTitle: string) => {
    setTasks((prevState) =>
      prevState.map((state) => {
        if (state.id === taskId) {
          return {
            ...state,
            title: taskNewTitle,
          };
        }
        return state;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
