/* eslint-disable react/no-unknown-property */
import {
    useTexture,
    useGLTF,
    OrbitControls,
    Environment,
    Text,
    MeshWobbleMaterial,
    PositionalAudio,
  } from "@react-three/drei";
  import { useFrame, extend } from "@react-three/fiber";
  import { useRef, Suspense } from "react";

  import { NodeToyMaterial, NodeToyTick } from "@nodetoy/react-nodetoy";
  import { data as waterShaderData } from "../shaders/water-shader.js"

  import Postprocessing from "./postprocessing.jsx";

  import titleFont from "../assets/fonts/Dosis.woff";

import { MeshReflectorMaterial } from "../shaders/MeshReflectorMaterial.tsx";
      

  // import portalVertexShader from './shaders/portal/vertex.jsx'
  // import portalFragmentShader from './shaders/portal/fragment.jsx'

//   const PortalMaterial = shaderMaterial(
//     {
//         u_Time: 0 ,
//         u_BigWavesElevation: 0 ,
//         u_BigWavesFrequency: new THREE.Vector2(1, 1.5),
//         u_BigWavesSpeed: 0.75,
//         u_SmallWavesElevation: 0.,
//         u_SmallWavesFrequency: 3 ,
//         u_SmallWavesSpeed: 0.2 ,
//         u_SmallIterations: 4 ,
//         u_DepthColor: new THREE.Color('blue'),
//         u_SurfaceColor: new THREE.Color('black'),
//         u_ColorOffset: 0.08 ,
//         u_ColorMultiplier: 5,
//         u_resolution: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
//         // mouse: new THREE.Vector2(0, 0)
//     },
//     portalVertexShader,
//     portalFragmentShader,
// )

// extend({ PortalMaterial })

  
  export default function Experience({start}) {
    const { nodes } = useGLTF("./models/model.glb");
    const { nodes: nodes2 } = useGLTF("./models/waterModel.glb");
    
    const bakedTexture = useTexture("./models/Bake.jpg");
    bakedTexture.flipY = false;




    // const portalMaterial = useRef()
    // portalMaterial.current = PortalMaterial;

    // useFrame((state, delta) =>
    // {
    //     portalMaterial.current.uTime += delta
    //     // portalMaterial.current.mouse = new THREE.Vector2(mousePosition.x, mousePosition.y)
    // })

  

    return (
      <>
      
      {/* <Suspense> */}
        <OrbitControls makeDefault target={[10, 10, -25]}/>
  
        {/* <Center> */}
          <mesh geometry={nodes.baked.geometry} >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
          <mesh position={[10,-0.5,15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100, 150]}/>
          <MeshReflectorMaterial 
          blur={[1024, 1024]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={0.75} // How much blur mixes with surface roughness
          mixStrength={1.2} // Strength of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
          args={[100, 100,150]} // PlaneBufferGeometry arguments
          rotation={[-Math.PI * 0.5, 0, 0]}
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          minDepthThreshold={0.5}
          maxDepthThreshold={6}
          color="pink"
          roughness={0}
          metalness={0.99}
          depthScale={90}
          gl={{antialias: true}}
          />
          </mesh>
          {/* <mesh geometry={nodes2.water.geometry} scale={[3,1,2]} position={[-5,-0.65 ,-1]}>
          <NodeToyMaterial data={waterShaderData} />
          </mesh> */}
      <Text anchorY="middle" font={titleFont} strokeColor={'pink'} characters="Web Developer" position={[11, 6, 10]} fontSize={2.5}>
      <MeshWobbleMaterial emissive="pink" factor={0.2}/>
      Web Developer
      </Text>
      <Text anchorY="middle" font={titleFont} receiveShadow castShadow strokeColor={'pink'} characters="Portofolio" position={[11, 3, 10]} fontSize={2.5}>
      <MeshWobbleMaterial emissive="pink" factor={0.}/>
        Portofolio
      </Text>
        {/* </Center> */}
        <Environment files={"./Environment/surreal_desert.hdr"} background={"only"} ground={{
    height: 15, // Height of the camera that was used to create the env map (Default: 15)
    radius: 120, // Radius of the world. (Default 60)
    scale: 1000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
  }}/>
        <Environment files={"./Environment/evening_road_01_puresky_1k.hdr"} background={false} />
        <NodeToyTick />
        <Postprocessing />
         <Suspense fallback={null}>{ start ? <PositionalAudio
        autoplay
        position={[10, 3, 15]}
        url="./audios/Lazy-Afternoon.mp3"
        distance={2}
        /> : '' }
      </Suspense>
      </>
    );
  }
  