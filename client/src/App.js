import './App.css';
import { wait } from "./utils";
import VoiceVisualizer from './voiceVisualizer';
import VoiceAssistant from './voiceAssisatant';

const textArea = document.getElementById("convertText")
const startButton = document.getElementById("start-btn")

const voiceVisualizer = new VoiceVisualizer()
const voiceAssistant = new VoiceAssistant()


const App = () => {

  let processingWord = null;

  async function processWord (word){
    switch (word) {
      case "Hello":
        voiceAssistant.saySpeech("Hello SaiGon, How are you doing today?")
        await wait(2500)
        break
      case "Introduce":
        voiceAssistant.saySpeech("I'm robot")
        await wait(2500)
        break
      case "Weather":
        voiceAssistant.saySpeech("Raining")
        await wait(2500)
        break
      case "Goodbye":
        voiceAssistant.saySpeech("I'm off, it's enough")
        await wait(2500)
        break
      case "Background Noise":
        voiceAssistant.saySpeech("Noise")
        await wait(500)
        break
      case "Background Noise Afternoon":
        voiceAssistant.saySpeech("Noise Afternoon")
        await wait(500)
        break
      case "Background Unkown":
        voiceAssistant.saySpeech("Noise Unknown")
        await wait(500)
        break    
      case "Snap":
        voiceAssistant.saySpeech("Snapping tach tach")
        await wait(500)
        break
      case "Clap":
        voiceAssistant.saySpeech("Hand Clap Clap Clap")
        await wait(500)
        break  
      case "CoffeeNoise":
        voiceAssistant.saySpeech("Noise Coffee")
        await wait(2500)
        break    
      default:
        voiceAssistant.saySpeech("I don't understanding")
        await wait(2500)
        break;
    }
    processingWord = null;
  }

  async function onListen(word) {
    if (processingWord) return;
    console.log("Word: ", word);
    processingWord = word;
    wait(2000)
    await processWord(word);
  }


  // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // const recognition = new SpeechRecognition()
  //Start Visualizer
  let isStarted = false
  startButton.onclick = async () => {
    if (!isStarted){
      startButton.innerHTML = "Starting"
      await voiceVisualizer.startVisualization()
      await voiceAssistant.startAssistant(onListen)
      isStarted = true;
      startButton.innerText = "Stop Record "
      // recognition.continous = true
      // recognition.interimResults = true
      // recognition.lang = 'en-US' //vi-VN 

      // var speech = true;
      // await recognition.addEventListener('result', e =>{
      //   const transcript = Array.from(e.results)
      //   .map(result => result[0])
      //   .map(result => result.transcript)
      //   textArea.innerHTML = transcript
      // })

      // if (speech === true){
      //   recognition.start()
      // }

    } else {
      startButton.innerText = "Stopping...";
      await voiceAssistant.stopAssistant();
      await voiceVisualizer.stopVisualization();
      isStarted = false;
      // recognition.interimResults = false
      startButton.innerText = "Start";
    }
    }
}

export default App()