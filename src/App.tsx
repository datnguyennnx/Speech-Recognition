import VisualizerWave from "./components/visualizer"

function App() {

    return (
      <div className="absolute w-full h-screen bg-black">
        <div className="flex flex-wrap w-full h-auto bg-black align-center justify-center">
        <div id="flex w-full h-fit align-center justify-center">
          <h1 className="w-full my-8 text-center font-medium text-3xl align-center justify-center text-white ">Voice Record</h1>
          <VisualizerWave />
        </div>
      </div>
      </div>
    )
  
}

export default App
