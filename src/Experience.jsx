import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { BallCollider, CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
export default function Experience() {
     
  const cube = useRef();
  const cubeJump = () => {
    cube.current.applyImpulse({ x: -0.5, y: 4.6, z: Math.random() - 0.5 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1.5, z: 0.1 });
  };

  
  const twister = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twister.current.setNextKinematicRotation(quaternionRotation);


  const angale = time*0.5;
  const x = Math.sin(angale * 4) * 5;
  const z = Math.cos(angale) * 5;
  twister.current.setNextKinematicTranslation({x:x, y: 0.4, z: z});

  })

  const collisionEnter = () => {
    console.log('толчок')
  }

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
              <boxGeometry args={[4, 4, 0.3]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
          <RigidBody
            ref={cube}
            position={[-2, 5, 3]}
            gravityScale={5.08}
            friction={0.8}
            mass={1}
          >
            <mesh castShadow onClick={cubeJump}>
              <boxGeometry args={[0.7, 1, 0.4]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
          <RigidBody colliders={false}>
            <BallCollider args={[1.5]} mass={1} />
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

          <RigidBody
            colliders="trimesh"
            gravityScale={5.08}
            friction={0.8}
            mass={1}
          >
            {/* <CuboidCollider args={[1, 1, 1]} /> */}
            <mesh
              castShadow
              position={[-1, 5, 0]}
              rotation={[Math.PI * 0.1, 0, 0]}
              receiveShadow
            >
              <torusGeometry args={[1.2, 0.2, 16, 32]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
          <RigidBody
            position={[0, 0.4, 0]}
            friction={0} // трение
            type="kinematicPosition"
            ref={twister}
            onCollisionEnter={collisionEnter}
          >
            <mesh castShadow scale={[0.3, 0.3, 3]}>
              <boxGeometry />
              <meshStandardMaterial color="blue" />
            </mesh>
          </RigidBody>
        </Physics>
      </>
    );
}
