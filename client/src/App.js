import './App.css';
import VoiceVisualizer from './voiceVisualizer';

const startButton = document.getElementById("start-btn")
const textArea = document.getElementById("convertText")
const voiceVisualizer = new VoiceVisualizer()
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'vi-VN' //vi-VN 

// Start Visualizer
let isStarted = false
startButton.onclick = async () => {
  if (!isStarted){
    startButton.innerHTML = "Starting"
    await voiceVisualizer.startVisualization()
    isStarted = true;
    startButton.innerText = "Stop Record "

    var speech = true;
    await recognition.addEventListener('result', e =>{
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
       textArea.innerHTML = transcript
    })

    if (speech == true){
      await recognition.start()
    }

  } else {
    startButton.innerText = "Stopping...";
    voiceVisualizer.stopVisualization();
    isStarted = false;
    startButton.innerText = "Start";
  }

  
}


const App = () => {}

export default App()