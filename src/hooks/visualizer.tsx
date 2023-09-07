import { useState } from "react"
import { currentVisualizer } from "sound-visualizer"
import  useSpeechRecognitionTypes from "./recognition"


function VisualizerWave() { 
  const [ microphone, setMicrophone ] = useState<MediaStream>()
  const { errors, listenContinuously, stopListening } = useSpeechRecognitionTypes()
  
  const getMic = async () => {
    await navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then( audio => { 
            setMicrophone(audio)
            const currentCanvas = document.getElementById("wave-visualizer")! as HTMLCanvasElement
            const { start } = currentVisualizer(audio, currentCanvas, {lineWidth: "thick", strokeColor: "#FFFFFF", heightNorm: 1})
            start()
          })
      .catch( err => { console.error(err) })}

  const stopMic = () => {
    for (const track of microphone!.getAudioTracks()) {
      track.stop()
    }
    setMicrophone(undefined)
  }

  const toggleMic = () => {
    microphone ? (stopMic(), stopListening()) : ( getMic(), listenContinuously())
  }

  return {
    toggleMic,
    microphone,
    errors
  }
}

export default VisualizerWave