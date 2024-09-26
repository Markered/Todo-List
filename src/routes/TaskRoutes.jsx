import { Routes, Route } from 'react-router-dom';
import TaskList from '../components/tasks/TaskList';

export default function TaskRoutes() {
  return (
    <Routes>
      <Route index element={<TaskList />} />
    </Routes>
  );
}

