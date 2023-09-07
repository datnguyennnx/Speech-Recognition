import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect } from 'react'



function useSpeechRecognitionTypes() { 
    let errors: string
    const { transcript, interimTranscript, finalTranscript} = useSpeechRecognition()

    if ( !SpeechRecognition.browserSupportsSpeechRecognition() ) { 
        errors = "Browser doesn't support speech recognition."
    }

    useEffect(() => {
        if (finalTranscript !== "") {
            console.log("Got final result:", finalTranscript)
        }
    }, [interimTranscript, finalTranscript])

    const listenContinuously = () => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "vi-VN",
          interimResults: true
        })
    }

    const stopListening = () => { 
        SpeechRecognition.stopListening()
    }

    return { 
        transcript, 
        listenContinuously,
        stopListening,
        errors
    }

}

export default useSpeechRecognitionTypes 