import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRouter from './routes/AppRouter'


const App = () => {
  return (
    <div className="App min-h-screen bg-gray-100">
      <AppRouter/>
    </div>
  );
};
export default App;
