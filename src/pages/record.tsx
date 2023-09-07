import { GetMicrophoneInput } from "../hooks/microphone"
import useSpeechRecognitionTypes from "../hooks/recognition"
import VisualizerWave from "../hooks/visualizer"

function RecordPage() { 
    const { transcript } = useSpeechRecognitionTypes()
    const { toggleMic, microphone, errors } = VisualizerWave()

    function Content() { 
        return( 
            <>
                <div className="flex my-4 w-full  align-center justify-center">
                    <GetMicrophoneInput onClick={toggleMic} microphone={microphone} />
                </div>

                <div className="flex my-4 w-full align-center justify-center">
                    <canvas id="wave-visualizer" className="w-[40rem] h-[10rem] align-center bg-black"></canvas>
                </div>

                <p className="w-[50rem] h-auto my-8 text-center font-medium text-lg align-center justify-center text-white">
                    {transcript}
                </p>
            </>
        )
    }

    
    return ( 
        <div className="flex flex-wrap w-full min-h-screen bg-black align-center justify-center">
            <div id="flex w-full h-fit align-center justify-center">
                    <h1 className="w-full my-8 text-center font-medium text-3xl align-center justify-center text-white ">
                    Voice Record    </h1>
                    <div>{ errors ? errors : Content()}</div>
            </div>
        </div>
    )
}

export default RecordPage