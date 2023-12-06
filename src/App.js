import React from 'react';

import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import { CTA, Brand, Navbar } from './components';
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
    
    {/* <Possibility /> */}
    <Vis/>
    {/* <CTA /> */}
    {/* <Blog /> */}
    {/* <Footer /> */}
  </div>
);

export default App;
