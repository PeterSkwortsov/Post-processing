import { Instance, OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { BallCollider, CuboidCollider, Debug, Physics, RigidBody, CylinderCollider, InstancedRigidBodies } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

export default function Experience() {
     

  const hamburger = useGLTF('./burger.glb') 


  const twister = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twister.current.setNextKinematicRotation(quaternionRotation);


  const angale = time*0.2;
  const x = Math.sin(angale * 4) * 9;
  const z = Math.cos(angale) * 5;
  twister.current.setNextKinematicTranslation({x:x, y: 0.4, z: z});

  })

  const collisionEnter = () => {
    console.log('толчок')
  }


  const cubeCount = 13
  const cubes = useRef()

  useEffect(() => 
    {

      for(let i = 0; i < cubeCount; i++) {
      const matrix = new THREE.Matrix4()
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(0, 0, 0, 1),
        new THREE.Vector3(1, 1, 1
        )
      )

      cubes.current.setMatrixAt(i, matrix)
    }
    }, [])

    return (
      <>
        <Perf position="top-left" />

        <color attach="background" args={["#9ef1f1"]} />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} castShadow intensity={4.5} />

        <Physics>
          <Debug />

          <RigidBody type="fixed" restitution={0.1}>
            <mesh position={[0, -0.8, 0]} receiveShadow>
              <boxGeometry args={[20, 0.5, 20]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>

          <RigidBody
            position={[0, 0, 0]}
            friction={0} // трение
            type="kinematicPosition"
            ref={twister}
            onCollisionEnter={collisionEnter}
          >
            <mesh castShadow scale={[0.3, 0.3, 4]} position={[0, -0.5, 0]}>
              <boxGeometry />
              <meshStandardMaterial color="blue" />
            </mesh>
          </RigidBody>

          <RigidBody position={[0, 12, 0]} colliders={false} mass={20}>
            <primitive
              object={hamburger.scene}
              scale={0.5}
              position={[-2, 0, 0]}
            />
            <CylinderCollider args={[0.5, 1.5]} position={[-2, 1.2, 0]} />
          </RigidBody>

          <RigidBody type="fixed">
            <CuboidCollider args={[10, 5, 0.2]} position={[0, 5, 10]} />
            <CuboidCollider args={[10, 5, 0.2]} position={[0, 5, -10]} />
            <CuboidCollider args={[0.2, 5, 10]} position={[-10, 5, 0]} />
            <CuboidCollider args={[0.2, 5, 10]} position={[10, 5, 0]} />
          </RigidBody>
      <InstancedRigidBodies>
          <instancedMesh 
          position={[0, -0.1, 0]} 
          ref={cubes} 
          args={[null, null, cubeCount]}
          castShadow
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
      </InstancedRigidBodies>

        </Physics>
      </>
    );
}
