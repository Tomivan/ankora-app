import React from 'react';
import './App.css';
import Sidenav from './sidenav/sidenav';
import Schedule from './scheduler/scheduler'

function App() {
  return (
    <div className="App">
      <Sidenav />
      <Schedule />
    </div>
  );
}

export default App;
