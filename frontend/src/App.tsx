import React from 'react';
import TasksBoard from './components/TasksBoard';

const App: React.FC = () => {
  return (
    <div className="bg-info d-flex" style={{ minHeight: '100vh' }}>
      <TasksBoard />
    </div>
  );
};

export default App;
