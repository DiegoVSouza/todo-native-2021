import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: (new Date().getSeconds() * Math.random()),
      title: newTaskTitle,
      done: false
    }
    setTasks(prevState => [...prevState, task])
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find(task => task.id === id)
    if (task) {
      task.done ? tasks.map(task => task.id === id ? { ...task, done: false } : { ...task }) : tasks.map(task => task.id === id ? { ...task, done: true } : { ...task })
    }
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => prevState.filter(item => item.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB863;'
  }
})