

import { Canvas } from '@react-three/fiber';

import Experience from './Experience';

export default function Home({ start }) {
  return (
    <div id='canvas'>
    <Canvas shadows={"soft"} legacy linear flat dpr={window.devicePixelRatio} gl={{antialias: false}} camera={{far: 20000, fov: 75, position: [10, 3, 29]}}>
    <Experience start={start} />
    </Canvas>
    </div>
  );
}