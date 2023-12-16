import React from "react";
import { Model } from "./Model";
import {Canvas} from '@react-three/fiber'

function Scene() {

  return (
      <Canvas 
        camera={{
          fov: 60, 
          position : [0,0,-27],
        }} 
      >     
       
        <ambientLight/>
        <directionalLight position={[-1.5,-10.5,-27]} color='white' intensity={0.5}/>
        <directionalLight color='white'/>
        <Model/>
        
      </Canvas>
  );
}
export default Scene;// 