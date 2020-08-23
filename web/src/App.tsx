import React from 'react';
import './App.css';
import Routes from './routers';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
