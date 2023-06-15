import {
    EffectComposer,
    Bloom,
    Noise,
    Vignette,
    SMAA,
    GodRays,
  } from "@react-three/postprocessing";
  import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
  import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";


export default function postprocessing() {
    const mesh = new Mesh(
        new CylinderGeometry(1.1, 1.1, 1.1, 10),
        new MeshBasicMaterial({
          color: 'pink',
          transparent: true,
          opacity: 1,
        })
      );
    //   mesh.rotation.x = Math.PI * 0.5;
      mesh.position.set(11, 16.5, 11);
      mesh.scale.set(4., 1., 4.);

  return (
    <EffectComposer multisampling={0} disableNormalPass={false}>
        <SMAA />
        <Bloom
          luminanceThreshold={0.01}
          luminanceSmoothing={10}
          height={300}
          opacity={4}
        />
        <Noise opacity={0.05} premultiply={true} blendFunction={BlendFunction.SCREEN} />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
        <primitive object={mesh} />
        <GodRays
          sun={mesh}
          blendFunction={BlendFunction.SCREEN}
          samples={30}
          density={0.97}
          decay={0.93}
          weight={0.8}
          exposure={0.1}
          clampMax={1}
          width={Resizer.AUTO_SIZE}
          height={Resizer.AUTO_SIZE}
          kernelSize={KernelSize.SMALL}
          blur={true}
        />
      </EffectComposer>
  )
}
