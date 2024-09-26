import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToDoList } from './data/models';
import './styles/index.css'
import { createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import CategoryRoutes from './routes/CategoryRoutes';
import TaskRoutes from './routes/TaskRoutes';

const dataLoader = () => {
  const toDoList = ToDoList.loadFromLocalStorage();
  return { toDoList };
};

const categoryLoader = () => {
  const toDoList = ToDoList.loadFromLocalStorage();
  return { categories: toDoList.categories };
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path='/' 
      element={<Layout />}
      loader={dataLoader}
    >
      <Route 
        path='/home'
        element={<Home />}
        loader={dataLoader}
      />
      <Route 
        path='/categories/*'
        element={<CategoryRoutes />}
        loader={categoryLoader}
      />
      <Route 
        path='/tasks/*'
        element={<TaskRoutes />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
