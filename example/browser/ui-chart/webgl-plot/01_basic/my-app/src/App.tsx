// import React, {Component} from 'react';
import './App.css';

import DataPool, {Test_DataPool} from './DataPool';

//import "./index.css";
import React, { useState } from "react";
import SimpleSlider from "simple-slider-react";

import WebGlAppChart from "./WebGlAppChart";

export default function SinApp() {
  //const freq = useParam();

  let [freq, setFreq] = useState(0.001);
  let [amp, setAmp] = useState(0.5);

  const onUpdate = (value: number) => {
    setAmp(value / 100);
  };

  return (
    <div className="mainapp" style={{ width: "90%" }}>
      <WebGlAppChart freq={freq} amp={amp} />
      <SimpleSlider min={1} max={100} onDrag={onUpdate} onUpdate={onUpdate} />
    </div>
  );
}

