import { Suspense, useState, useEffect } from 'react';

import { LoadingScreen } from "./components/loadingScreen.jsx";
import  Home from "./components/home.jsx";
import Ui from './components/ui';


const audio = new Audio("./audios/Lazy-Afternoon.mp3");
audio.loop = true;

function App() {
  const [start, setStart] = useState(false);


  return (
    <>
    <Suspense fallback={null}> <Home start={start} /></Suspense>
    <Ui className="w-full"/>
    <LoadingScreen started={start} onStarted={() => setStart(true)} />
    </>
  )
}

export default App
