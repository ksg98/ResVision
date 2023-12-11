import React from 'react';

import { Features, WhatGPT3, Header } from './containers';
import { Brand, Navbar } from './components';
//import Vis from './Vis/Vis'
import Vis from './Vis/Vis';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Brand />
    <WhatGPT3 />

    <Features /> 
    <Vis/>
  
  </div>
);

export default App;
