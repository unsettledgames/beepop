import React from 'react'

import '../assets/css/App.css';
import NoteData from "../classes/PianoRoll/NoteData";
import Synth from "../classes/Instruments/Synth/Synth";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    const sas = new Synth();
    //sas.playNote(new NoteData());
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