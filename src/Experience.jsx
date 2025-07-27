import {OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, Debug } from "@react-three/rapier";
import Level from "./Level";


export default function Experience() {
     



 



  
    return (
      <>
        <Perf position="top-left" />

        <color attach="background" args={["#9ef1f1"]} />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} castShadow intensity={4.5} />

      <Physics>
            <Level />
            <Debug />
      </Physics>
      </>
    );
}
