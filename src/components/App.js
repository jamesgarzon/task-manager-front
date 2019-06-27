import React from 'react';
import '../styles/App.scss';
import Tasks from "./Tasks";
import NewTask from "./NewTask";

function App() {
  return (
   <div className="app__container">
     <h1 className="app__title">Tasks</h1>
     <NewTask/>
     <Tasks/>
   </div>
  );
}

export default App;
