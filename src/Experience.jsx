import { Perf } from "r3f-perf";
import { Physics, Debug } from "@react-three/rapier";
import {Level} from "./Level";
import Player from "./Player";
import useGame from "./stores/useGame";

export default function Experience() {
     
  const blocksCount = useGame((state) => state.blocksCount)

 



  
    return (
      <>
        <Perf position="top-left" />

        <color attach="background" args={["#9ef1f1"]} />

        

      <Physics>
            <Level count={blocksCount}/>
            {/* <Debug /> */}
      </Physics>
      {/* <Player /> */}
      </>
    );
}
