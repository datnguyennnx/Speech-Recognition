import { useState, useEffect } from "react"
import { GetMicrophoneInput } from "./microphone"
import { currentVisualizer } from "sound-visualizer"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


function VisualizerWave() { 
  const [microphone, setMicrophone] = useState<MediaStream>()
  const {
    transcript,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition()

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript)
    }
  }, [interimTranscript, finalTranscript])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
    return null
  }

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "vi-VN",
      interimResults: true
    });
  };


	const getMic = async () => {
    await navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(
      audio => { 
        setMicrophone(audio)
        const currentCanvas = document.getElementById("wave-visualizer")! as HTMLCanvasElement
        const { start } = currentVisualizer(audio, currentCanvas, {lineWidth: "thick", strokeColor: "#FFFFFF", heightNorm: 1})
        start()      
      }
    ).catch( err => {
        console.log(err)
    })
  }

    const stopMic = () => {
		for (const track of microphone!.getAudioTracks()) {
			track.stop()
		}
		setMicrophone(undefined)
	}

	const toggleMic = () => {
		microphone ? (stopMic(), SpeechRecognition.stopListening()) : ( getMic(), listenContinuously())
	}
    return ( 
        <>
          <div className="flex my-4 w-full  align-center justify-center">
            <GetMicrophoneInput onClick={toggleMic} microphone={microphone} />
          </div>

          <div className="flex my-4 w-full align-center justify-center">
            <canvas id="wave-visualizer" className="w-[40rem] h-[10rem] align-center bg-black"></canvas>
          </div>

          <p className="w-[50rem] h-auto my-8 text-center font-medium text-xl align-center justify-center text-white">
            {transcript}
          </p>
        </>
    )
}

export default VisualizerWave