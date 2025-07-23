import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { BallCollider, CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
export default function Experience() {
     
  const cube = useRef();
  const cubeJump = () => {
    cube.current.applyImpulse({ x: -0.5, y: 4.6, z: Math.random() - 0.5 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1.5, z: 0.1 });
  };
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
          <RigidBody
            ref={cube}
            position={[0, 5, 0]}
            // gravityScale={0.08}
            // friction={0.2}
          >
            <mesh castShadow onClick={cubeJump}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
          <RigidBody colliders={false}>
            <BallCollider args={[1.5]} mass={1}
            
            />
            <mesh position={[0, 4, 0]} castShadow>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="hotpink" />
              <BallCollider mass={1} args={[0.8, 0.8, 0.8]} />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed" restitution={0.1}>
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[20, 0.5, 20]} />
              <meshStandardMaterial color="green" />
            </mesh>
          </RigidBody>

          <RigidBody colliders="trimesh">
            {/* <CuboidCollider args={[1, 1, 1]} /> */}
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
