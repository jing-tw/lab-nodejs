import Scope from './Scope'

function showWave(){
    let canvas = document.querySelector('canvas');
    // create audio content
    let ac = new window.AudioContext; // new (window.AudioContext || window.webkitAudioContext)();
    let sourceOsc = ac.createOscillator();    // create periodic waveform source

    // setup wave type
    sourceOsc.type = 'square';
    sourceOsc.frequency.value = 10; // in Hz

    // create graph
    let displayScope:Scope = new Scope(ac, canvas); // create oscilloscope device for display audiosource on canvas
    sourceOsc.connect(displayScope.input); // [osc source] -> [the display intput]

    // render
    sourceOsc.start(); // start the source
    displayScope.start(); // start the oscilloscope device
}

function main(){
    let button = document.createElement('button');
    button.innerHTML = 'Show';
    button.addEventListener('click', function() {
       showWave();
    });

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
}

main();

