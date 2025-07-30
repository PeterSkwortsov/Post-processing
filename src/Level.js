import * as THREE from 'three'
import { RigidBody, CuboidCollider, useRapier } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useMemo, useEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei'


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




export function Player() {

const body = useRef()
const [subscribeKeys, getKeys] = useKeyboardControls()
const {rapier, world} = useRapier()
const rapierWorld = world.raw()


    const [smoothhedCameraPosition] = useState(() => new THREE.Vector3(20, -190, 20))
    const [smoothhedCameraTarget] = useState(() => new THREE.Vector3())

    const jump = () => {

        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = {x: 0, y: -1, z: 0}
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })
        }
    }

    useEffect(() => {
        const unsubscripe = subscribeKeys(
            (state) => state.jump,
            (value) => {
                
                if (value) {
                    jump()

                }
            }
        )
        return () => {
            unsubscripe()
        }

    })


    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)


        // камера

        const bodyposition = body.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyposition)
        cameraPosition.y += 0.9
        cameraPosition.z += 3

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyposition)
        cameraTarget.y += 0.25

        smoothhedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothhedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothhedCameraPosition)
        state.camera.lookAt(smoothhedCameraTarget)
    })

    return <RigidBody 
    ref={body} 
    colliders='ball' 
    position={[0, 1, 0.5]}
    restitution={0.2}
    friction={0}
    linearDamping={0.9}
    angularDamping={0.9}
    >
        <mesh castShadow>
            <icosahedronGeometry args={[0.3, 4]} />
            <meshStandardMaterial flatShading color='mediumpurple' />
        </mesh>
    </RigidBody>
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

            <RigidBody type='kinematicPosition' position={[0, 0.1, length - 5.1]} restitution={0.2} friction={0}>
                <mesh geometry={boxGeometry} material={waltMaterial} scale={[4, 0.3, 0.3]} />
            </RigidBody>
   

    <CuboidCollider args={[2, 0.1, 2 * length]} position={[0, -0.15, -(length * 2) + 2]} restitution={0.2} friction={1} />
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
    <Player />
</>
}