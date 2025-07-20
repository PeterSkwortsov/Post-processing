import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
    Vignette,
    EffectComposer,
    Glitch,
   Noise,
   Bloom
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";
import { GlitchMode } from "postprocessing";

export default function Experience() {
   

    return (
      <>
        {/* <color args={["#000000ff"]} attach="background" /> */}

       {/* <EffectComposer multisampling={8}>
       
          это  multisampling четкость, 8 оптимально  */}
          {/* <Vignette
            offset={0.5} // vignette offset
            darkness={0.5} // vignette darkness
            eskil={false} // Eskil's vignette technique
            blendFunction={BlendFunction.}
          />*/}
          {/* это эффект затенения по краям 
        </EffectComposer>*/}


        {/* <EffectComposer multisampling={8}>
        <Glitch
            delay={[0.5, 1]}
            duration={[0.1, 0.3]}
            strength={[0.2, 0.4]}
          />
        </EffectComposer> */}
        {/* <EffectComposer multisampling={8}>
        <Glitch
            delay={[0.5, 1]}
            duration={[0.1, 0.3]}
            strength={[0.2, 0.4]}
            mode={GlitchMode.RECOVER}
          />
         <Noise 
         blendFunction={BlendFunction.AVERAGE}
         />
        </EffectComposer> */}
        <EffectComposer>
            <Bloom mipmapBlur
            intensity={0.4}
            />
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh castShadow position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial 
          color='white' 
          emissive='orange'
          emissiveIntensity={1}
          toneMapped={true} />
        </mesh>

        <mesh
          receiveShadow
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </>
    );
}
