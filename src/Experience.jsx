import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Debug, Physics, RigidBody } from "@react-three/rapier";

export default function Experience() {
     


    return (
      <>
        <Perf position="top-left" />

        <color attach="background" args={["#9ef1f1"]} />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} castShadow intensity={4.5} />

        <Physics>
          <Debug />

          <RigidBody>
            <mesh position={[4, 2, 0]} rotation-y={Math.PI * 0.5} castShadow>
              <boxGeometry args={[3, 3, 0.3]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
          <RigidBody>
            <mesh castShadow position={[2, 0, 3]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="multicolored" />
            </mesh>
          </RigidBody>
          <RigidBody colliders="ball">
            <mesh position={[0, 2, 0]} castShadow>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed">
            <mesh position={[0, -2, 0]} receiveShadow>
              <boxGeometry args={[10, 0.5, 10]} />
              <meshStandardMaterial color="green" />
            </mesh>
          </RigidBody>

          <RigidBody colliders="trimesh">
            <mesh
              castShadow
              position={[0, 2, 0]}
              rotation={[Math.PI * 0.1, 0, 0]}
              receiveShadow
            >
              <torusGeometry args={[1.2, 0.2, 16, 32]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
        </Physics>
      </>
    );
}
