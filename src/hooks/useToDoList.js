import { useState, useEffect } from 'react';
import { ToDoList } from '../data/models';

export default function useToDoList() {
  const [toDoList, setToDoList] = useState(ToDoList.loadFromLocalStorage());

  useEffect(() => {
    toDoList.saveToLocalStorage();
  }, [toDoList]);

  const addCategory = (name, description = 'NONE', color) => {
    if (name && name !== 'All' && color) {
      toDoList.addCategory(name, description, color);
      setToDoList(new ToDoList(toDoList.categories));
    }
  };

  const deleteCategory = (categoryId) => {
    if (categoryId) {
      toDoList.deleteCategory(categoryId);
      setToDoList(new ToDoList(toDoList.categories));
    }
  };

  const addTask = (categoryId, task) => {
    const category = toDoList.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.addTask(task);
      setToDoList(new ToDoList(toDoList.categories));
    }
  };

  const deleteTask = (categoryId, taskId) => {
    const category = toDoList.categories.find(cat => cat.id === categoryId);
    if (category) {
      category.deleteTask(taskId);
      setToDoList(new ToDoList(toDoList.categories));
    }
  };

  return {
    toDoList,
    addCategory,
    deleteCategory,
    addTask,
    deleteTask,
  };
}
