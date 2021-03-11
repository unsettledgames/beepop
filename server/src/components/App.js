import React from 'react'

import '../assets/css/App.css';
import NoteData from "../classes/PianoRoll/NoteData";
import Synth from "../classes/Instruments/Synth/Synth";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    const sas = new Synth();
    sas.playNote(new NoteData("C-4", 0, 500, 1));
    setTimeout(function(){sas.playNote(new NoteData("E-4", 0, 1000, 1))}, 501);
    setTimeout(function(){sas.playNote(new NoteData("G-4", 0, 1000, 1))}, 1001);
  }

  render() {

    return (
      <div>
        <h1>Hello, Electron!</h1>

        <p>Primo Commit XD Enjoy</p>
      </div>
    )
  }
  
}