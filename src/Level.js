import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen', roughness: 0.5, metalness: 0.5 })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow', roughness: 0.5, metalness: 0.5 })
const obstacle = new THREE.MeshStandardMaterial({ color: 'orangered', roughness: 0.5 })
const waltMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' })


export function BlockSpinner({ position = [0, 0, 0] })
{
    const [speed ] = useState(() => (Math.random() + 0.6) * (Math.random() < 0.5 ? -1 : 1))
    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(
            0,
            time * speed,
            0
        ))

        obstaclec.current.setNextKinematicRotation(rotation)
     
    })

    const obstaclec = useRef()

    const waltMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' })

    return <group position={position}>
        <mesh
            geometry={boxGeometry}
            position={[0, -0.1, 0]}
            receiveShadow
            scale={[4, 0.1, 4]}
            material={floor2Material}
        />
        <RigidBody type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0} ref={obstaclec}>
          <mesh geometry={boxGeometry}  material=   {obstacle} scale={[3.5, 0.3, 0.3]}         receiveShadow castShadow/>
        </RigidBody>
    </group>
}


export function BlockStart({position = [0, 0, 0]}) {
    
    

    return <group position={position}>
    <mesh 
    geometry={boxGeometry} 
    position={[0, -0.1, 0]} 
    receiveShadow
    scale={[4, 0.1, 4]}
    material={floor1Material}
    />
    </group>
}


export function BlockLimbo({ position = [0, 0, 0] }) {
    const [timeOffset] = useState(() => (Math.random() * Math.PI * 2))
    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        
        const y = Math.sin(time * timeOffset) + 1.2
        obstaclec.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })

    })

    const obstaclec = useRef()

    const waltMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' })

    return <group position={position}>
        <mesh
            geometry={boxGeometry}
            position={[0, -0.1, 0]}
            receiveShadow
            scale={[4, 0.1, 4]}
            material={floor2Material}
        />
        <RigidBody type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0} ref={obstaclec}>
            <mesh geometry={boxGeometry} material={obstacle} scale={[3.5, 0.3, 0.3]} receiveShadow castShadow />
        </RigidBody>
    </group>
}

export function BlockAxe({ position = [0, 0, 0] }) {
    const [timeOffset] = useState(() => (Math.random() * Math.PI * 2))
    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const x = Math.sin((time * 0.5) * timeOffset) * 1.25
        obstaclec.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2] })

    })

    const obstaclec = useRef()

    const waltMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' })

    return <group position={position}>
        <mesh
            geometry={boxGeometry}
            position={[0, -0.1, 0]}
            receiveShadow
            scale={[4, 0.1, 4]}
            material={floor2Material}
        />
        <RigidBody type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0} ref={obstaclec}>
            <mesh geometry={boxGeometry} material={obstacle} scale={[1.5, 1.3, 0.3]} receiveShadow castShadow />
        </RigidBody>
    </group>
}

export function BlockEnd({ position = [0, 0, 0] }) {

    const gamburger = useGLTF('./burger.glb')

    gamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return <group position={position}>
        <mesh
            geometry={boxGeometry}
            position={[0, 0, 0]}
            receiveShadow
            scale={[4, 0.1, 4]}
            material={floor1Material}
        />
        <RigidBody type='fixed' colliders='hull' restitution={0.4} friction={0}>
            <primitive object={gamburger.scene} scale={0.4} castShadow  />
        </RigidBody>
    </group>
}

function Bounds({length = 1}){
    return <>
    <RigidBody type='fixed' restitution={0.2} friction={0}>
    <mesh 
        position={[2.15, 0.60, -(length * 2) + 2]}
        geometry={boxGeometry} 
        scale={[0.3, 1.5, 4 * length]}
        material={waltMaterial}
        castShadow
    />
    <mesh 
        position={[-2.15, 0.60, -(length * 2) + 2]}
        geometry={boxGeometry} 
        scale={[0.3, 1.5, 4 * length]}
        material={waltMaterial}
        castShadow
        receiveShadow
    />
    <mesh 
        position={[0, 0.60, -(length * 4) + 2]}
        geometry={boxGeometry} 
        scale={[4, 1.5, 0.3]}
        material={waltMaterial}
        castShadow
        receiveShadow
    />
        </RigidBody>

    </>
}

export function Level({ count = 5 , types = [ BlockSpinner, BlockLimbo, BlockAxe]}) 
{

    const bloks = useMemo(() => {
        const blocks = []

        for (let i = 0; i < count; i++)
        {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks
    }, [count, types])
 
return <>


    <BlockStart position={[0, 0, 0]}/>
    
    {bloks.map((Block, index) => <Block key={index} position={[0, 0, -(index+ 1) * 4]} />)}
  
    <BlockEnd position={[0, 0, -(count+1) * 4]}/> 
    <Bounds length={count + 2}/>
</>
}