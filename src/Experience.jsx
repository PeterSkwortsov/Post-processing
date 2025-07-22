import { OrbitControls } from "@react-three/drei";
import { useGLTF, Environment, Float, PresentationControls, ContactShadows, Html, Text } from "@react-three/drei";

export default function Experience() {
     
    const computer = useGLTF(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
    );

    return (
      <>
        <color attach="background" args={["#312b2b"]} />
        <OrbitControls makeDefault />

        <PresentationControls
          global={false}
          rotation={[0.15, 0.2, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          // config={{ mass: 2, tension: 400 }}
          // snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.4}>
            <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={65}
              color="#eca777"
              rotation={[-0.1, Math.PI, 0]}
              position={[0, 0.55, -1.15]}
            />

            <primitive
              object={computer.scene}
              scale={1.6}
              position-y={-1.6}
              position-z={1}
              position-x={-0.2}
            >
              <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.17}
                position={[0, 1.56, -1.4]}
                rotation-x={-0.256}
              >
                <iframe occlude src="https://borsch-art.ru/"></iframe>
              </Html>
              <Text
              font="./Forum.woff"
              fontWeight={100}
                position={[2, 1.75, 0]}
                fontSize={0.25}
                rotation-y={-1.15}
                maxWidth={1.5}
                textAlign="center"
              >
                Тут может быть ваш сайт
              </Text>
            </primitive>
          </Float>
        </PresentationControls>
        <ContactShadows position-y={-2.0} blur={2} />

        {/* <ambientLight intensity={1.5} /> */}
        <directionalLight position={[3, 2, 1]} intensity={10.5} />
      </>
    );
}
