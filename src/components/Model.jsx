import React, {useEffect, useRef, useState } from "react";
import { useGLTF, Html,Shape } from "@react-three/drei";
import {useLoader} from "@react-three/fiber";
import { TextureLoader} from 'three/src/loaders/TextureLoader'
import { DoubleSide } from "three";
import { motion } from "framer-motion-3d"
import on from "../../src/on2.png"
import play from "../../src/play.png"
import pausa from "../../src/pausa.png"

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/Tocadiscos2.glb");

  const discoTextura = useLoader( TextureLoader ,"/texturas/parl2.png")
  //discoTextura.image.width  = 1024
  discoTextura.flipY = false
  discoTextura.repeat.set(2.25,2.25)
  discoTextura.offset.x = -0.625
  discoTextura.offset.y = -0.625
  //console.log(discoTextura.rotation )

  const [isEncendido, setEncendido] = useState(false)
  const [isGirando, setGirando] = useState(false)
  const [flotar, setFlotar] = useState(false)

  const [musY, setMusY] = useState(0)
  const [musZ, setMusZ] = useState(0)
  
  const [volumenZoom, setVolumenZoom] = useState(0)
  const [y, setY] = useState(-9)
  const [x, setX] = useState(-1)

  const [pausado, setPausado] = useState(false)
  const [retraso, setRetraso] = useState(true)

  const [nivel, setNivel] = useState(false)

  const [scaleActual, setScaleActual] = useState([.8,.86,.8])

  useEffect(()=> {
    if(window.innerWidth <= 1029) {
      setScaleActual([.77,.83,.77])
      setX(-1)
    }
    if(window.innerWidth > 1029) {
      setScaleActual([.8,.86,.8])
      setX(-1)
    }
    if(window.innerWidth <= 974) {
      setScaleActual([.67,.73,.67])
      setX(-1)
    }
    if(window.innerWidth <= 400) {
      setScaleActual([.55,.61,.55])
      setX(-0.5)
    }
  }, [])
  
  function actualizadorS () {
    if(window.innerWidth <= 1029) {
      setScaleActual([.77,.83,.77])
      setX(-1)
    }
    if(window.innerWidth > 1029) {
      setScaleActual([.8,.86,.8])
      setX(-1)
    }
    if(window.innerWidth <= 974) {
      setScaleActual([.67,.73,.67])
      setX(-1)
    }
    if(window.innerWidth <= 400) {
      setScaleActual([.55,.61,.55])
      setX(-0.5)
    }
  }
  // de 374 a 400 para que encaje en el movil, es decir son -20 px de diferencia con el simulador del navegador
  window.onresize = actualizadorS

  const [volumen2, setVolumen2] = useState(.5)

  const variantes = {
    encendido: { rotateZ:0.45, transition:{duration:0.5} },
    apagado: { rotateZ:0, transition:{duration:0.5, delay:0.4}},
    girando: {rotateZ:[null, 1000000], transition:{duration: 250000,ease:"linear",delay: retraso == true ? 0.9 : 0}},
    noGirando: {rotateZ:[null]},
    abierto: {rotateX: 2 ,transition:{duration:0.5, delay:0.5, ease:"linear"}},
    
    inicio: {rotateX:-Math.PI / 4, transition:{rotateX:{duration:0.2, ease:"linear"}}},

    bajarNivelador: {rotateY:pausado? 0 : -0.07, transition:{delay:nivel? 0 : 0.6, ease:"linear"}},
    subirNivelador: {rotateY:0, transition:{ease:"linear"}},
    flotar: {x: x,y: y, z: volumenZoom, rotateX:-Math.PI /4 , rotateY:musY, rotateZ:musZ, transition:{duration:0.4, ease:"linear"}}
  } 
  
  const total = useRef(null)
  const rodar = useRef(null)
  const cover = useRef(null)

  const [audio] = useState(new Audio('/siesta.mp3'))

  useEffect(()=> { if(isGirando == true) { setTimeout(() => { audio.play() }, nivel? 500 :1000) } },[isGirando])
  useEffect(()=> { if(isGirando == false) { audio.pause()}},[isGirando])
  useEffect(()=> { if(isGirando == false  && !nivel) {  audio.currentTime = 0 }},[isGirando])

  useEffect(() => {audio.volume = volumen2},[volumen2])

  useEffect(() => {
    if(isEncendido == false){
      setPausado(false)
      setRetraso(true)
    }
    if(isEncendido == true){
      setRetraso(false)
    }
  }, [isEncendido]) 
  
  return (
  <>

    <motion.group
      scale={scaleActual}
      ref={total}
      name="hhh"
      position={[window.innerWidth <= 400? -0.5 : -1, -9, 0]} 
      rotation={[-Math.PI / 2.5 , 0, 0]} 
      variants={variantes} 
      animate= {flotar ? 'flotar' : 'inicio'}
      {...props} 
      dispose={null}
    > 
      <group  name="Scene"> 
        <group
          name="Main_Body"
          position={[2.924, -0.667, -3.144]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.491}
        >
          <mesh
            name="_"
            castShadow
            receiveShadow
            geometry={nodes._.geometry}
            material={materials.color}
            position={[-23.874, 30.465, -10.172]}
          />
          <mesh
            name="Body_2"
            castShadow
            receiveShadow
            geometry={nodes.Body_2.geometry}
            material={materials.Black}
            position={[-1.845, 16.769, -0.623]}
          />
          <motion.group
            animate='abierto'
            variants={variantes}
            ref={cover}
            name="Cover"
            position={[-2.782, 33.732, -1.719]}
            rotation={[0, 0, 0]}
          >
            <mesh
              name="Cover_2"
              castShadow
              receiveShadow
              geometry={nodes.Cover_2.geometry}
              material={materials["Transparen-CoverDisk"]}
              position={[0, -16.931, -1.122]}
            />
            <group name="Symmetry" position={[0, -16.931, -1.122]}>
              <mesh
                name="Sweep"
                castShadow
                receiveShadow
                geometry={nodes.Sweep.geometry}
                material={nodes.Sweep.material}
                position={[13.484, 16.913, 1.556]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
              />
            </group>
          </motion.group>
          <group
            name="Rotactable_Supports"
            position={[-2.799, 33.354, -1.718]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="Body"
              castShadow
              receiveShadow
              geometry={nodes.Body.geometry}
              material={materials.Black}
              position={[16.848, 0.52, -0.418]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
        <group
          name="Disk_Reader_Parts"
          position={[-5.029, 2.379, 9.403]}
          rotation={[Math.PI / 2, 0, -1.537]}
          scale={0.491}
        >
          <motion.group variants={variantes} animate= {isEncendido? "encendido" : "apagado"} initial="apagado" name="armReader">
            <motion.group 
              name="ArmNivelador"
              variants={variantes}
              animate= { isEncendido? 'bajarNivelador' : 'subirNivelador' }
            >
              <group
                name="Base"
                position={[0.001, 0, 1.546]}
                rotation={[0, 0, 1.534]}
              >
                <mesh
                  name="Mesh006"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh006.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Mesh006_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh006_1.geometry}
                  material={materials.Aluminium}
                />
              </group>
              <group
                name="Head"
                position={[17.467, -0.649, -0.773]}
                rotation={[-1.571, -1.534, 0]}
              >
                <mesh
                  name="Mesh007"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh007.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Mesh007_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh007_1.geometry}
                  material={materials.Aluminium}
                />
              </group>
              <mesh
                name="Neck"
                castShadow
                receiveShadow
                geometry={nodes.Neck.geometry}
                material={materials["color.001"]}
                position={[5.502, -0.205, -0.773]}
                rotation={[-1.571, -1.534, 0]}
              />
            </motion.group>
            <mesh
              name="Rotactable_Base"
              castShadow
              receiveShadow
              geometry={nodes.Rotactable_Base.geometry}
              material={materials.Black}
              position={[0.065, -0.041, 1.546]}
              rotation={[0, 0, 1.534]}
            />
          </motion.group>
          <group
            name="Disk_Files"
            position={[9.649, 17.948, 2.309]}
            rotation={[0, 0, 1.537]}
          >
            <mesh
              name="Bed_Disk"
              castShadow
              receiveShadow
              geometry={nodes.Bed_Disk.geometry}
              material={materials.Grey}
              position={[0, 0, 0.094]}
            />
            <motion.group 
              variants={variantes} 
              animate= {isGirando? "girando": "noGirando"}
              initial={{rotateZ : Math.PI}}
              ref={rodar}
              name="Disk" 
              position={[0, 0, -0.275]}
            >
              <mesh
                name="Mesh195"
                castShadow
                receiveShadow
                geometry={nodes.Mesh195.geometry}
                
              >
                <meshStandardMaterial color="#1f1f1f" roughness={0} metalness={0}/>
              </mesh>
              <mesh
                name="Mesh195_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh195_1.geometry}
              >
                <meshStandardMaterial map={discoTextura} /> 
              </mesh>
            </motion.group>
            <group
              name="Lateral_Details"
              position={[0, 0, 0.253]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                name="Extrude_2_0"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_0.geometry}
                material={materials.Black}
                position={[0, 0, -13.041]}
                rotation={[-2.129, 0, -Math.PI / 2]}
              />
              <mesh
                name="Extrude_2_1"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_1.geometry}
                material={materials.Black}
                position={[0.445, 0, -13.033]}
                rotation={[-2.129, 0.018, -1.6]}
              />
              <mesh
                name="Extrude_2_10"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_10.geometry}
                material={materials.Black}
                position={[4.367, 0, -12.288]}
                rotation={[-2.103, 0.178, -1.864]}
              />
              <mesh
                name="Extrude_2_100"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_100.geometry}
                material={materials.Black}
                position={[-3.518, 0, 12.557]}
                rotation={[-1.029, -0.143, 1.338]}
              />
              <mesh
                name="Extrude_2_101"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_101.geometry}
                material={materials.Black}
                position={[-3.945, 0, 12.43]}
                rotation={[-1.034, -0.161, 1.308]}
              />
              <mesh
                name="Extrude_2_102"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_102.geometry}
                material={materials.Black}
                position={[-4.367, 0, 12.288]}
                rotation={[-1.039, -0.178, 1.278]}
              />
              <mesh
                name="Extrude_2_103"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_103.geometry}
                material={materials.Black}
                position={[-4.784, 0, 12.132]}
                rotation={[-1.044, -0.196, 1.248]}
              />
              <mesh
                name="Extrude_2_104"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_104.geometry}
                material={materials.Black}
                position={[-5.195, 0, 11.961]}
                rotation={[-1.05, -0.213, 1.218]}
              />
              <mesh
                name="Extrude_2_105"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_105.geometry}
                material={materials.Black}
                position={[-5.601, 0, 11.777]}
                rotation={[-1.057, -0.23, 1.187]}
              />
              <mesh
                name="Extrude_2_106"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_106.geometry}
                material={materials.Black}
                position={[-6, 0, 11.579]}
                rotation={[-1.064, -0.246, 1.157]}
              />
              <mesh
                name="Extrude_2_107"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_107.geometry}
                material={materials.Black}
                position={[-6.391, 0, 11.367]}
                rotation={[-1.072, -0.263, 1.126]}
              />
              <mesh
                name="Extrude_2_108"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_108.geometry}
                material={materials.Black}
                position={[-6.776, 0, 11.142]}
                rotation={[-1.08, -0.279, 1.095]}
              />
              <mesh
                name="Extrude_2_109"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_109.geometry}
                material={materials.Black}
                position={[-7.152, 0, 10.904]}
                rotation={[-1.089, -0.295, 1.063]}
              />
              <mesh
                name="Extrude_2_11"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_11.geometry}
                material={materials.Black}
                position={[4.784, 0, -12.132]}
                rotation={[-2.097, 0.196, -1.894]}
              />
              <mesh
                name="Extrude_2_110"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_110.geometry}
                material={materials.Black}
                position={[-7.52, 0, 10.654]}
                rotation={[-1.099, -0.311, 1.031]}
              />
              <mesh
                name="Extrude_2_111"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_111.geometry}
                material={materials.Black}
                position={[-7.88, 0, 10.391]}
                rotation={[-1.109, -0.326, 0.999]}
              />
              <mesh
                name="Extrude_2_112"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_112.geometry}
                material={materials.Black}
                position={[-8.23, 0, 10.116]}
                rotation={[-1.119, -0.341, 0.967]}
              />
              <mesh
                name="Extrude_2_113"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_113.geometry}
                material={materials.Black}
                position={[-8.57, 0, 9.829]}
                rotation={[-1.131, -0.356, 0.934]}
              />
              <mesh
                name="Extrude_2_114"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_114.geometry}
                material={materials.Black}
                position={[-8.901, 0, 9.531]}
                rotation={[-1.142, -0.37, 0.901]}
              />
              <mesh
                name="Extrude_2_115"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_115.geometry}
                material={materials.Black}
                position={[-9.221, 0, 9.221]}
                rotation={[-1.155, -0.384, 0.867]}
              />
              <mesh
                name="Extrude_2_116"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_116.geometry}
                material={materials.Black}
                position={[-9.531, 0, 8.901]}
                rotation={[-1.168, -0.398, 0.834]}
              />
              <mesh
                name="Extrude_2_117"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_117.geometry}
                material={materials.Black}
                position={[-9.829, 0, 8.57]}
                rotation={[-1.181, -0.411, 0.799]}
              />
              <mesh
                name="Extrude_2_118"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_118.geometry}
                material={materials.Black}
                position={[-10.116, 0, 8.23]}
                rotation={[-1.195, -0.424, 0.765]}
              />
              <mesh
                name="Extrude_2_119"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_119.geometry}
                material={materials.Black}
                position={[-10.391, 0, 7.88]}
                rotation={[-1.21, -0.436, 0.73]}
              />
              <mesh
                name="Extrude_2_12"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_12.geometry}
                material={materials.Black}
                position={[5.195, 0, -11.961]}
                rotation={[-2.091, 0.213, -1.924]}
              />
              <mesh
                name="Extrude_2_120"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_120.geometry}
                material={materials.Black}
                position={[-10.654, 0, 7.52]}
                rotation={[-1.225, -0.448, 0.694]}
              />
              <mesh
                name="Extrude_2_121"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_121.geometry}
                material={materials.Black}
                position={[-10.904, 0, 7.152]}
                rotation={[-1.241, -0.459, 0.658]}
              />
              <mesh
                name="Extrude_2_122"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_122.geometry}
                material={materials.Black}
                position={[-11.142, 0, 6.776]}
                rotation={[-1.257, -0.47, 0.622]}
              />
              <mesh
                name="Extrude_2_123"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_123.geometry}
                material={materials.Black}
                position={[-11.367, 0, 6.391]}
                rotation={[-1.274, -0.48, 0.585]}
              />
              <mesh
                name="Extrude_2_124"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_124.geometry}
                material={materials.Black}
                position={[-11.579, 0, 6]}
                rotation={[-1.291, -0.49, 0.548]}
              />
              <mesh
                name="Extrude_2_125"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_125.geometry}
                material={materials.Black}
                position={[-11.777, 0, 5.601]}
                rotation={[-1.309, -0.499, 0.511]}
              />
              <mesh
                name="Extrude_2_126"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_126.geometry}
                material={materials.Black}
                position={[-11.961, 0, 5.195]}
                rotation={[-1.327, -0.508, 0.473]}
              />
              <mesh
                name="Extrude_2_127"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_127.geometry}
                material={materials.Black}
                position={[-12.132, 0, 4.784]}
                rotation={[-1.345, -0.516, 0.435]}
              />
              <mesh
                name="Extrude_2_128"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_128.geometry}
                material={materials.Black}
                position={[-12.288, 0, 4.367]}
                rotation={[-1.365, -0.523, 0.397]}
              />
              <mesh
                name="Extrude_2_129"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_129.geometry}
                material={materials.Black}
                position={[-12.43, 0, 3.945]}
                rotation={[-1.384, -0.529, 0.358]}
              />
              <mesh
                name="Extrude_2_13"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_13.geometry}
                material={materials.Black}
                position={[5.601, 0, -11.777]}
                rotation={[-2.085, 0.23, -1.954]}
              />
              <mesh
                name="Extrude_2_130"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_130.geometry}
                material={materials.Black}
                position={[-12.557, 0, 3.518]}
                rotation={[-1.404, -0.535, 0.319]}
              />
              <mesh
                name="Extrude_2_131"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_131.geometry}
                material={materials.Black}
                position={[-12.67, 0, 3.088]}
                rotation={[-1.424, -0.541, 0.28]}
              />
              <mesh
                name="Extrude_2_132"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_132.geometry}
                material={materials.Black}
                position={[-12.768, 0, 2.653]}
                rotation={[-1.444, -0.545, 0.24]}
              />
              <mesh
                name="Extrude_2_133"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_133.geometry}
                material={materials.Black}
                position={[-12.851, 0, 2.216]}
                rotation={[-1.465, -0.549, 0.201]}
              />
              <mesh
                name="Extrude_2_134"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_134.geometry}
                material={materials.Black}
                position={[-12.919, 0, 1.776]}
                rotation={[-1.486, -0.553, 0.161]}
              />
              <mesh
                name="Extrude_2_135"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_135.geometry}
                material={materials.Black}
                position={[-12.972, 0, 1.334]}
                rotation={[-1.507, -0.555, 0.121]}
              />
              <mesh
                name="Extrude_2_136"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_136.geometry}
                material={materials.Black}
                position={[-13.01, 0, 0.89]}
                rotation={[-1.528, -0.557, 0.08]}
              />
              <mesh
                name="Extrude_2_137"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_137.geometry}
                material={materials.Black}
                position={[-13.033, 0, 0.445]}
                rotation={[-1.549, -0.558, 0.04]}
              />
              <mesh
                name="Extrude_2_138"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_138.geometry}
                material={materials.Black}
                position={[-13.041, 0, 0]}
                rotation={[-Math.PI / 2, -0.559, 0]}
              />
              <mesh
                name="Extrude_2_139"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_139.geometry}
                material={materials.Black}
                position={[-13.033, 0, -0.445]}
                rotation={[-1.592, -0.558, -0.04]}
              />
              <mesh
                name="Extrude_2_14"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_14.geometry}
                material={materials.Black}
                position={[6, 0, -11.579]}
                rotation={[-2.077, 0.246, -1.985]}
              />
              <mesh
                name="Extrude_2_140"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_140.geometry}
                material={materials.Black}
                position={[-13.01, 0, -0.89]}
                rotation={[-1.613, -0.557, -0.08]}
              />
              <mesh
                name="Extrude_2_141"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_141.geometry}
                material={materials.Black}
                position={[-12.972, 0, -1.334]}
                rotation={[-1.635, -0.555, -0.121]}
              />
              <mesh
                name="Extrude_2_142"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_142.geometry}
                material={materials.Black}
                position={[-12.919, 0, -1.776]}
                rotation={[-1.656, -0.553, -0.161]}
              />
              <mesh
                name="Extrude_2_143"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_143.geometry}
                material={materials.Black}
                position={[-12.851, 0, -2.216]}
                rotation={[-1.677, -0.549, -0.201]}
              />
              <mesh
                name="Extrude_2_144"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_144.geometry}
                material={materials.Black}
                position={[-12.768, 0, -2.653]}
                rotation={[-1.697, -0.545, -0.24]}
              />
              <mesh
                name="Extrude_2_145"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_145.geometry}
                material={materials.Black}
                position={[-12.67, 0, -3.088]}
                rotation={[-1.718, -0.541, -0.28]}
              />
              <mesh
                name="Extrude_2_146"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_146.geometry}
                material={materials.Black}
                position={[-12.557, 0, -3.518]}
                rotation={[-1.738, -0.535, -0.319]}
              />
              <mesh
                name="Extrude_2_147"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_147.geometry}
                material={materials.Black}
                position={[-12.43, 0, -3.945]}
                rotation={[-1.758, -0.529, -0.358]}
              />
              <mesh
                name="Extrude_2_148"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_148.geometry}
                material={materials.Black}
                position={[-12.288, 0, -4.367]}
                rotation={[-1.777, -0.523, -0.397]}
              />
              <mesh
                name="Extrude_2_149"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_149.geometry}
                material={materials.Black}
                position={[-12.132, 0, -4.784]}
                rotation={[-1.796, -0.516, -0.435]}
              />
              <mesh
                name="Extrude_2_15"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_15.geometry}
                material={materials.Black}
                position={[6.391, 0, -11.367]}
                rotation={[-2.07, 0.263, -2.016]}
              />
              <mesh
                name="Extrude_2_150"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_150.geometry}
                material={materials.Black}
                position={[-11.961, 0, -5.195]}
                rotation={[-1.815, -0.508, -0.473]}
              />
              <mesh
                name="Extrude_2_151"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_151.geometry}
                material={materials.Black}
                position={[-11.777, 0, -5.601]}
                rotation={[-1.833, -0.499, -0.511]}
              />
              <mesh
                name="Extrude_2_152"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_152.geometry}
                material={materials.Black}
                position={[-11.579, 0, -6]}
                rotation={[-1.851, -0.49, -0.548]}
              />
              <mesh
                name="Extrude_2_153"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_153.geometry}
                material={materials.Black}
                position={[-11.367, 0, -6.391]}
                rotation={[-1.868, -0.48, -0.585]}
              />
              <mesh
                name="Extrude_2_154"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_154.geometry}
                material={materials.Black}
                position={[-11.142, 0, -6.776]}
                rotation={[-1.885, -0.47, -0.622]}
              />
              <mesh
                name="Extrude_2_155"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_155.geometry}
                material={materials.Black}
                position={[-10.904, 0, -7.152]}
                rotation={[-1.901, -0.459, -0.658]}
              />
              <mesh
                name="Extrude_2_156"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_156.geometry}
                material={materials.Black}
                position={[-10.654, 0, -7.52]}
                rotation={[-1.917, -0.448, -0.694]}
              />
              <mesh
                name="Extrude_2_157"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_157.geometry}
                material={materials.Black}
                position={[-10.391, 0, -7.88]}
                rotation={[-1.932, -0.436, -0.73]}
              />
              <mesh
                name="Extrude_2_158"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_158.geometry}
                material={materials.Black}
                position={[-10.116, 0, -8.23]}
                rotation={[-1.946, -0.424, -0.765]}
              />
              <mesh
                name="Extrude_2_159"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_159.geometry}
                material={materials.Black}
                position={[-9.829, 0, -8.57]}
                rotation={[-1.96, -0.411, -0.799]}
              />
              <mesh
                name="Extrude_2_16"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_16.geometry}
                material={materials.Black}
                position={[6.776, 0, -11.142]}
                rotation={[-2.061, 0.279, -2.047]}
              />
              <mesh
                name="Extrude_2_160"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_160.geometry}
                material={materials.Black}
                position={[-9.531, 0, -8.901]}
                rotation={[-1.974, -0.398, -0.834]}
              />
              <mesh
                name="Extrude_2_161"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_161.geometry}
                material={materials.Black}
                position={[-9.221, 0, -9.221]}
                rotation={[-1.987, -0.384, -0.867]}
              />
              <mesh
                name="Extrude_2_162"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_162.geometry}
                material={materials.Black}
                position={[-8.901, 0, -9.531]}
                rotation={[-1.999, -0.37, -0.901]}
              />
              <mesh
                name="Extrude_2_163"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_163.geometry}
                material={materials.Black}
                position={[-8.57, 0, -9.829]}
                rotation={[-2.011, -0.356, -0.934]}
              />
              <mesh
                name="Extrude_2_164"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_164.geometry}
                material={materials.Black}
                position={[-8.23, 0, -10.116]}
                rotation={[-2.022, -0.341, -0.967]}
              />
              <mesh
                name="Extrude_2_165"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_165.geometry}
                material={materials.Black}
                position={[-7.88, 0, -10.391]}
                rotation={[-2.033, -0.326, -0.999]}
              />
              <mesh
                name="Extrude_2_166"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_166.geometry}
                material={materials.Black}
                position={[-7.52, 0, -10.654]}
                rotation={[-2.043, -0.311, -1.031]}
              />
              <mesh
                name="Extrude_2_167"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_167.geometry}
                material={materials.Black}
                position={[-7.152, 0, -10.904]}
                rotation={[-2.052, -0.295, -1.063]}
              />
              <mesh
                name="Extrude_2_168"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_168.geometry}
                material={materials.Black}
                position={[-6.776, 0, -11.142]}
                rotation={[-2.061, -0.279, -1.095]}
              />
              <mesh
                name="Extrude_2_169"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_169.geometry}
                material={materials.Black}
                position={[-6.391, 0, -11.367]}
                rotation={[-2.07, -0.263, -1.126]}
              />
              <mesh
                name="Extrude_2_17"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_17.geometry}
                material={materials.Black}
                position={[7.152, 0, -10.904]}
                rotation={[-2.052, 0.295, -2.078]}
              />
              <mesh
                name="Extrude_2_170"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_170.geometry}
                material={materials.Black}
                position={[-6, 0, -11.579]}
                rotation={[-2.077, -0.246, -1.157]}
              />
              <mesh
                name="Extrude_2_171"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_171.geometry}
                material={materials.Black}
                position={[-5.601, 0, -11.777]}
                rotation={[-2.085, -0.23, -1.187]}
              />
              <mesh
                name="Extrude_2_172"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_172.geometry}
                material={materials.Black}
                position={[-5.195, 0, -11.961]}
                rotation={[-2.091, -0.213, -1.218]}
              />
              <mesh
                name="Extrude_2_173"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_173.geometry}
                material={materials.Black}
                position={[-4.784, 0, -12.132]}
                rotation={[-2.097, -0.196, -1.248]}
              />
              <mesh
                name="Extrude_2_174"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_174.geometry}
                material={materials.Black}
                position={[-4.367, 0, -12.288]}
                rotation={[-2.103, -0.178, -1.278]}
              />
              <mesh
                name="Extrude_2_175"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_175.geometry}
                material={materials.Black}
                position={[-3.945, 0, -12.43]}
                rotation={[-2.108, -0.161, -1.308]}
              />
              <mesh
                name="Extrude_2_176"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_176.geometry}
                material={materials.Black}
                position={[-3.518, 0, -12.557]}
                rotation={[-2.112, -0.143, -1.338]}
              />
              <mesh
                name="Extrude_2_177"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_177.geometry}
                material={materials.Black}
                position={[-3.088, 0, -12.67]}
                rotation={[-2.116, -0.126, -1.367]}
              />
              <mesh
                name="Extrude_2_178"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_178.geometry}
                material={materials.Black}
                position={[-2.653, 0, -12.768]}
                rotation={[-2.12, -0.108, -1.396]}
              />
              <mesh
                name="Extrude_2_179"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_179.geometry}
                material={materials.Black}
                position={[-2.216, 0, -12.851]}
                rotation={[-2.123, -0.09, -1.426]}
              />
              <mesh
                name="Extrude_2_18"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_18.geometry}
                material={materials.Black}
                position={[7.52, 0, -10.654]}
                rotation={[-2.043, 0.311, -2.11]}
              />
              <mesh
                name="Extrude_2_180"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_180.geometry}
                material={materials.Black}
                position={[-1.776, 0, -12.919]}
                rotation={[-2.125, -0.072, -1.455]}
              />
              <mesh
                name="Extrude_2_181"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_181.geometry}
                material={materials.Black}
                position={[-1.334, 0, -12.972]}
                rotation={[-2.127, -0.054, -1.484]}
              />
              <mesh
                name="Extrude_2_182"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_182.geometry}
                material={materials.Black}
                position={[-0.89, 0, -13.01]}
                rotation={[-2.128, -0.036, -1.513]}
              />
              <mesh
                name="Extrude_2_183"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_183.geometry}
                material={materials.Black}
                position={[-0.445, 0, -13.033]}
                rotation={[-2.129, -0.018, -1.542]}
              />
              <mesh
                name="Extrude_2_19"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_19.geometry}
                material={materials.Black}
                position={[7.88, 0, -10.391]}
                rotation={[-2.033, 0.326, -2.142]}
              />
              <mesh
                name="Extrude_2_2"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_2.geometry}
                material={materials.Black}
                position={[0.89, 0, -13.01]}
                rotation={[-2.128, 0.036, -1.629]}
              />
              <mesh
                name="Extrude_2_20"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_20.geometry}
                material={materials.Black}
                position={[8.23, 0, -10.116]}
                rotation={[-2.022, 0.341, -2.175]}
              />
              <mesh
                name="Extrude_2_21"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_21.geometry}
                material={materials.Black}
                position={[8.57, 0, -9.829]}
                rotation={[-2.011, 0.356, -2.208]}
              />
              <mesh
                name="Extrude_2_22"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_22.geometry}
                material={materials.Black}
                position={[8.901, 0, -9.531]}
                rotation={[-1.999, 0.37, -2.241]}
              />
              <mesh
                name="Extrude_2_23"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_23.geometry}
                material={materials.Black}
                position={[9.221, 0, -9.221]}
                rotation={[-1.987, 0.384, -2.274]}
              />
              <mesh
                name="Extrude_2_24"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_24.geometry}
                material={materials.Black}
                position={[9.531, 0, -8.901]}
                rotation={[-1.974, 0.398, -2.308]}
              />
              <mesh
                name="Extrude_2_25"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_25.geometry}
                material={materials.Black}
                position={[9.829, 0, -8.57]}
                rotation={[-1.96, 0.411, -2.342]}
              />
              <mesh
                name="Extrude_2_26"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_26.geometry}
                material={materials.Black}
                position={[10.116, 0, -8.23]}
                rotation={[-1.946, 0.424, -2.377]}
              />
              <mesh
                name="Extrude_2_27"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_27.geometry}
                material={materials.Black}
                position={[10.391, 0, -7.88]}
                rotation={[-1.932, 0.436, -2.412]}
              />
              <mesh
                name="Extrude_2_28"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_28.geometry}
                material={materials.Black}
                position={[10.654, 0, -7.52]}
                rotation={[-1.917, 0.448, -2.447]}
              />
              <mesh
                name="Extrude_2_29"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_29.geometry}
                material={materials.Black}
                position={[10.904, 0, -7.152]}
                rotation={[-1.901, 0.459, -2.483]}
              />
              <mesh
                name="Extrude_2_3"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_3.geometry}
                material={materials.Black}
                position={[1.334, 0, -12.972]}
                rotation={[-2.127, 0.054, -1.658]}
              />
              <mesh
                name="Extrude_2_30"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_30.geometry}
                material={materials.Black}
                position={[11.142, 0, -6.776]}
                rotation={[-1.885, 0.47, -2.519]}
              />
              <mesh
                name="Extrude_2_31"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_31.geometry}
                material={materials.Black}
                position={[11.367, 0, -6.391]}
                rotation={[-1.868, 0.48, -2.556]}
              />
              <mesh
                name="Extrude_2_32"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_32.geometry}
                material={materials.Black}
                position={[11.579, 0, -6]}
                rotation={[-1.851, 0.49, -2.593]}
              />
              <mesh
                name="Extrude_2_33"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_33.geometry}
                material={materials.Black}
                position={[11.777, 0, -5.601]}
                rotation={[-1.833, 0.499, -2.631]}
              />
              <mesh
                name="Extrude_2_34"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_34.geometry}
                material={materials.Black}
                position={[11.961, 0, -5.195]}
                rotation={[-1.815, 0.508, -2.668]}
              />
              <mesh
                name="Extrude_2_35"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_35.geometry}
                material={materials.Black}
                position={[12.132, 0, -4.784]}
                rotation={[-1.796, 0.516, -2.706]}
              />
              <mesh
                name="Extrude_2_36"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_36.geometry}
                material={materials.Black}
                position={[12.288, 0, -4.367]}
                rotation={[-1.777, 0.523, -2.745]}
              />
              <mesh
                name="Extrude_2_37"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_37.geometry}
                material={materials.Black}
                position={[12.43, 0, -3.945]}
                rotation={[-1.758, 0.529, -2.783]}
              />
              <mesh
                name="Extrude_2_38"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_38.geometry}
                material={materials.Black}
                position={[12.557, 0, -3.518]}
                rotation={[-1.738, 0.535, -2.822]}
              />
              <mesh
                name="Extrude_2_39"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_39.geometry}
                material={materials.Black}
                position={[12.67, 0, -3.088]}
                rotation={[-1.718, 0.541, -2.862]}
              />
              <mesh
                name="Extrude_2_4"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_4.geometry}
                material={materials.Black}
                position={[1.776, 0, -12.919]}
                rotation={[-2.125, 0.072, -1.687]}
              />
              <mesh
                name="Extrude_2_40"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_40.geometry}
                material={materials.Black}
                position={[12.768, 0, -2.653]}
                rotation={[-1.697, 0.545, -2.901]}
              />
              <mesh
                name="Extrude_2_41"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_41.geometry}
                material={materials.Black}
                position={[12.851, 0, -2.216]}
                rotation={[-1.677, 0.549, -2.941]}
              />
              <mesh
                name="Extrude_2_42"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_42.geometry}
                material={materials.Black}
                position={[12.919, 0, -1.776]}
                rotation={[-1.656, 0.553, -2.981]}
              />
              <mesh
                name="Extrude_2_43"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_43.geometry}
                material={materials.Black}
                position={[12.972, 0, -1.334]}
                rotation={[-1.635, 0.555, -3.021]}
              />
              <mesh
                name="Extrude_2_44"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_44.geometry}
                material={materials.Black}
                position={[13.01, 0, -0.89]}
                rotation={[-1.613, 0.557, -3.061]}
              />
              <mesh
                name="Extrude_2_45"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_45.geometry}
                material={materials.Black}
                position={[13.033, 0, -0.445]}
                rotation={[-1.592, 0.558, -3.101]}
              />
              <mesh
                name="Extrude_2_46"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_46.geometry}
                material={materials.Black}
                position={[13.041, 0, 0]}
                rotation={[-Math.PI / 2, 0.559, Math.PI]}
              />
              <mesh
                name="Extrude_2_47"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_47.geometry}
                material={materials.Black}
                position={[13.033, 0, 0.445]}
                rotation={[-1.549, 0.558, 3.101]}
              />
              <mesh
                name="Extrude_2_48"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_48.geometry}
                material={materials.Black}
                position={[13.01, 0, 0.89]}
                rotation={[-1.528, 0.557, 3.061]}
              />
              <mesh
                name="Extrude_2_49"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_49.geometry}
                material={materials.Black}
                position={[12.972, 0, 1.334]}
                rotation={[-1.507, 0.555, 3.021]}
              />
              <mesh
                name="Extrude_2_5"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_5.geometry}
                material={materials.Black}
                position={[2.216, 0, -12.851]}
                rotation={[-2.123, 0.09, -1.716]}
              />
              <mesh
                name="Extrude_2_50"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_50.geometry}
                material={materials.Black}
                position={[12.919, 0, 1.776]}
                rotation={[-1.486, 0.553, 2.981]}
              />
              <mesh
                name="Extrude_2_51"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_51.geometry}
                material={materials.Black}
                position={[12.851, 0, 2.216]}
                rotation={[-1.465, 0.549, 2.941]}
              />
              <mesh
                name="Extrude_2_52"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_52.geometry}
                material={materials.Black}
                position={[12.768, 0, 2.653]}
                rotation={[-1.444, 0.545, 2.901]}
              />
              <mesh
                name="Extrude_2_53"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_53.geometry}
                material={materials.Black}
                position={[12.67, 0, 3.088]}
                rotation={[-1.424, 0.541, 2.862]}
              />
              <mesh
                name="Extrude_2_54"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_54.geometry}
                material={materials.Black}
                position={[12.557, 0, 3.518]}
                rotation={[-1.404, 0.535, 2.822]}
              />
              <mesh
                name="Extrude_2_55"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_55.geometry}
                material={materials.Black}
                position={[12.43, 0, 3.945]}
                rotation={[-1.384, 0.529, 2.783]}
              />
              <mesh
                name="Extrude_2_56"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_56.geometry}
                material={materials.Black}
                position={[12.288, 0, 4.367]}
                rotation={[-1.365, 0.523, 2.745]}
              />
              <mesh
                name="Extrude_2_57"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_57.geometry}
                material={materials.Black}
                position={[12.132, 0, 4.784]}
                rotation={[-1.345, 0.516, 2.706]}
              />
              <mesh
                name="Extrude_2_58"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_58.geometry}
                material={materials.Black}
                position={[11.961, 0, 5.195]}
                rotation={[-1.327, 0.508, 2.668]}
              />
              <mesh
                name="Extrude_2_59"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_59.geometry}
                material={materials.Black}
                position={[11.777, 0, 5.601]}
                rotation={[-1.309, 0.499, 2.631]}
              />
              <mesh
                name="Extrude_2_6"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_6.geometry}
                material={materials.Black}
                position={[2.653, 0, -12.768]}
                rotation={[-2.12, 0.108, -1.745]}
              />
              <mesh
                name="Extrude_2_60"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_60.geometry}
                material={materials.Black}
                position={[11.579, 0, 6]}
                rotation={[-1.291, 0.49, 2.593]}
              />
              <mesh
                name="Extrude_2_61"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_61.geometry}
                material={materials.Black}
                position={[11.367, 0, 6.391]}
                rotation={[-1.274, 0.48, 2.556]}
              />
              <mesh
                name="Extrude_2_62"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_62.geometry}
                material={materials.Black}
                position={[11.142, 0, 6.776]}
                rotation={[-1.257, 0.47, 2.519]}
              />
              <mesh
                name="Extrude_2_63"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_63.geometry}
                material={materials.Black}
                position={[10.904, 0, 7.152]}
                rotation={[-1.241, 0.459, 2.483]}
              />
              <mesh
                name="Extrude_2_64"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_64.geometry}
                material={materials.Black}
                position={[10.654, 0, 7.52]}
                rotation={[-1.225, 0.448, 2.447]}
              />
              <mesh
                name="Extrude_2_65"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_65.geometry}
                material={materials.Black}
                position={[10.391, 0, 7.88]}
                rotation={[-1.21, 0.436, 2.412]}
              />
              <mesh
                name="Extrude_2_66"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_66.geometry}
                material={materials.Black}
                position={[10.116, 0, 8.23]}
                rotation={[-1.195, 0.424, 2.377]}
              />
              <mesh
                name="Extrude_2_67"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_67.geometry}
                material={materials.Black}
                position={[9.829, 0, 8.57]}
                rotation={[-1.181, 0.411, 2.342]}
              />
              <mesh
                name="Extrude_2_68"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_68.geometry}
                material={materials.Black}
                position={[9.531, 0, 8.901]}
                rotation={[-1.168, 0.398, 2.308]}
              />
              <mesh
                name="Extrude_2_69"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_69.geometry}
                material={materials.Black}
                position={[9.221, 0, 9.221]}
                rotation={[-1.155, 0.384, 2.274]}
              />
              <mesh
                name="Extrude_2_7"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_7.geometry}
                material={materials.Black}
                position={[3.088, 0, -12.67]}
                rotation={[-2.116, 0.126, -1.775]}
              />
              <mesh
                name="Extrude_2_70"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_70.geometry}
                material={materials.Black}
                position={[8.901, 0, 9.531]}
                rotation={[-1.142, 0.37, 2.241]}
              />
              <mesh
                name="Extrude_2_71"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_71.geometry}
                material={materials.Black}
                position={[8.57, 0, 9.829]}
                rotation={[-1.131, 0.356, 2.208]}
              />
              <mesh
                name="Extrude_2_72"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_72.geometry}
                material={materials.Black}
                position={[8.23, 0, 10.116]}
                rotation={[-1.119, 0.341, 2.175]}
              />
              <mesh
                name="Extrude_2_73"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_73.geometry}
                material={materials.Black}
                position={[7.88, 0, 10.391]}
                rotation={[-1.109, 0.326, 2.142]}
              />
              <mesh
                name="Extrude_2_74"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_74.geometry}
                material={materials.Black}
                position={[7.52, 0, 10.654]}
                rotation={[-1.099, 0.311, 2.11]}
              />
              <mesh
                name="Extrude_2_75"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_75.geometry}
                material={materials.Black}
                position={[7.152, 0, 10.904]}
                rotation={[-1.089, 0.295, 2.078]}
              />
              <mesh
                name="Extrude_2_76"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_76.geometry}
                material={materials.Black}
                position={[6.776, 0, 11.142]}
                rotation={[-1.08, 0.279, 2.047]}
              />
              <mesh
                name="Extrude_2_77"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_77.geometry}
                material={materials.Black}
                position={[6.391, 0, 11.367]}
                rotation={[-1.072, 0.263, 2.016]}
              />
              <mesh
                name="Extrude_2_78"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_78.geometry}
                material={materials.Black}
                position={[6, 0, 11.579]}
                rotation={[-1.064, 0.246, 1.985]}
              />
              <mesh
                name="Extrude_2_79"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_79.geometry}
                material={materials.Black}
                position={[5.601, 0, 11.777]}
                rotation={[-1.057, 0.23, 1.954]}
              />
              <mesh
                name="Extrude_2_8"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_8.geometry}
                material={materials.Black}
                position={[3.518, 0, -12.557]}
                rotation={[-2.112, 0.143, -1.804]}
              />
              <mesh
                name="Extrude_2_80"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_80.geometry}
                material={materials.Black}
                position={[5.195, 0, 11.961]}
                rotation={[-1.05, 0.213, 1.924]}
              />
              <mesh
                name="Extrude_2_81"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_81.geometry}
                material={materials.Black}
                position={[4.784, 0, 12.132]}
                rotation={[-1.044, 0.196, 1.894]}
              />
              <mesh
                name="Extrude_2_82"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_82.geometry}
                material={materials.Black}
                position={[4.367, 0, 12.288]}
                rotation={[-1.039, 0.178, 1.864]}
              />
              <mesh
                name="Extrude_2_83"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_83.geometry}
                material={materials.Black}
                position={[3.945, 0, 12.43]}
                rotation={[-1.034, 0.161, 1.834]}
              />
              <mesh
                name="Extrude_2_84"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_84.geometry}
                material={materials.Black}
                position={[3.518, 0, 12.557]}
                rotation={[-1.029, 0.143, 1.804]}
              />
              <mesh
                name="Extrude_2_85"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_85.geometry}
                material={materials.Black}
                position={[3.088, 0, 12.67]}
                rotation={[-1.025, 0.126, 1.775]}
              />
              <mesh
                name="Extrude_2_86"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_86.geometry}
                material={materials.Black}
                position={[2.653, 0, 12.768]}
                rotation={[-1.022, 0.108, 1.745]}
              />
              <mesh
                name="Extrude_2_87"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_87.geometry}
                material={materials.Black}
                position={[2.216, 0, 12.851]}
                rotation={[-1.019, 0.09, 1.716]}
              />
              <mesh
                name="Extrude_2_88"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_88.geometry}
                material={materials.Black}
                position={[1.776, 0, 12.919]}
                rotation={[-1.016, 0.072, 1.687]}
              />
              <mesh
                name="Extrude_2_89"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_89.geometry}
                material={materials.Black}
                position={[1.334, 0, 12.972]}
                rotation={[-1.015, 0.054, 1.658]}
              />
              <mesh
                name="Extrude_2_9"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_9.geometry}
                material={materials.Black}
                position={[3.945, 0, -12.43]}
                rotation={[-2.108, 0.161, -1.834]}
              />
              <mesh
                name="Extrude_2_90"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_90.geometry}
                material={materials.Black}
                position={[0.89, 0, 13.01]}
                rotation={[-1.013, 0.036, 1.629]}
              />
              <mesh
                name="Extrude_2_91"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_91.geometry}
                material={materials.Black}
                position={[0.445, 0, 13.033]}
                rotation={[-1.013, 0.018, 1.6]}
              />
              <mesh
                name="Extrude_2_92"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_92.geometry}
                material={materials.Black}
                position={[0, 0, 13.041]}
                rotation={[-1.012, 0, Math.PI / 2]}
              />
              <mesh
                name="Extrude_2_93"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_93.geometry}
                material={materials.Black}
                position={[-0.445, 0, 13.033]}
                rotation={[-1.013, -0.018, 1.542]}
              />
              <mesh
                name="Extrude_2_94"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_94.geometry}
                material={materials.Black}
                position={[-0.89, 0, 13.01]}
                rotation={[-1.013, -0.036, 1.513]}
              />
              <mesh
                name="Extrude_2_95"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_95.geometry}
                material={materials.Black}
                position={[-1.334, 0, 12.972]}
                rotation={[-1.015, -0.054, 1.484]}
              />
              <mesh
                name="Extrude_2_96"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_96.geometry}
                material={materials.Black}
                position={[-1.776, 0, 12.919]}
                rotation={[-1.016, -0.072, 1.455]}
              />
              <mesh
                name="Extrude_2_97"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_97.geometry}
                material={materials.Black}
                position={[-2.216, 0, 12.851]}
                rotation={[-1.019, -0.09, 1.426]}
              />
              <mesh
                name="Extrude_2_98"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_98.geometry}
                material={materials.Black}
                position={[-2.653, 0, 12.768]}
                rotation={[-1.022, -0.108, 1.396]}
              />
              <mesh
                name="Extrude_2_99"
                castShadow
                receiveShadow
                geometry={nodes.Extrude_2_99.geometry}
                material={materials.Black}
                position={[-3.088, 0, 12.67]}
                rotation={[-1.025, -0.126, 1.367]}
              />
            </group>
            <group name="Rubber" position={[0, 0, -0.103]}>
              <mesh
                name="Mesh010"
                castShadow
                receiveShadow
                geometry={nodes.Mesh010.geometry}
                material={materials.Black}
              />
              <mesh
                name="Mesh010_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh010_1.geometry}
                material={materials["Gold brushed"]}
              />
            </group>
          </group>
          <mesh
            name="Disk_Table"
            castShadow
            receiveShadow
            geometry={nodes.Disk_Table.geometry}
            material={materials.Black}
            position={[7.749, 10.459, 3.595]}
            rotation={[0, 0, 1.537]}
          />
          <mesh side={DoubleSide} scale={[1.8,8,0.001]} position={[22.48, 9.43, 2.860]}  rotation={[0, 0,-0.145]}>
            <Shape material={materials.Black} ></Shape>
          </mesh>
          <mesh side={DoubleSide} scale={[1,2,0.001]} position={[21.80,5.62, 2.870]}  rotation={[0, 0, -1.85]}>
            <Shape material={materials.Black} ></Shape>
          </mesh>
          <mesh
            name="Neck_Support"
            castShadow
            receiveShadow
            geometry={nodes.Neck_Support.geometry}
            material={materials["color.002"]}
            position={[12.052, -0.389, 0.671]}
            rotation={[0, 0, 1.537]}
          />
        </group>
      </group>
      <motion.mesh
        name="boton de encendido y apagado"
        position={[9.42,1,-0.770]}
        rotation={[0, 0, 0]}
        scale={[0.63, 0.2, 0.63]} 
        >
          <Html
            geometry={<circleGeometry/>}
            transform
            occlude = 'blending'
            rotation={[- Math.PI /2.1, 0 , Math.PI ]}
            position={[0,0,0]}
            style={{       
              height: '150px',
              width: '150px',
              borderRadius:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
            }}
            className="noSelect"
            >
              <div                        
              onPointerEnter={(e) => {   
                if(e.nativeEvent.offsetY <= 621){
                  setFlotar(true) 
                  setMusY(0.1)
                  setMusZ(0.15) 
                }
                if( e.nativeEvent.offsetY > 621){
                  setFlotar(true)     
                  setMusY(0.2)
                  setMusZ(0.2) 
                }
              }}
              onPointerOut={(e) => { 
                setMusY(0)
                setMusZ(0) 
              }}
              style={{width:'100%',height:'100%', backgroundColor:'white', display:"flex", justifyContent:'center',
              alignItems:'center'}} 
              onClick={() => 
                { 
                  setEncendido(isEncendido => !isEncendido)
                  setNivel(nivel => false)
                  if(pausado == false){
                    setGirando(isGirando => !isGirando)
                  }
                } 
              } 
              className="noSelect barra"
            >
              <img className="noSelect" style={{ pointerEvents: 'none'}} src={on} width={'100px'} height={'100px'} />
            </div>
          </Html>
      </motion.mesh>
      <motion.mesh
      name="controlador del volumen"
      position={[-6.059,0.99,-0.80]}
      rotation={[0, 0, 0]}
      scale={[0.970, 0.2, 2.70]} 
      >
        <boxGeometry/>
        <meshStandardMaterial transparent={true} opacity={0} roughness={0} metalness={0}/>
        <Html
          transform
          occlude = 'blending'
          rotation={[- Math.PI /2.1 , 0 , Math.PI ]}
          position={[-1.35,0,-0.02]} 
          style={{
            height: '27px',
            width: '210px',
            backgroundColor: 'black',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          <div 
            onMouseMove={(e) => {
              setFlotar(true)     
              setMusY(0)
              setMusZ(0) 
              setVolumenZoom(-5)
              setY(-8)
              setX(0)
            }}
            onMouseOut={(e) => { 
              setVolumenZoom(0)
              setMusY(0)
              setMusZ(0) 
              setY(-9)
              setX(-1)
            }}
            
            style={{
              width:'210px',height:'100%', backgroundColor:'black',alignItems:'center',
              justifyContent:'center', display: isEncendido == true? 'flex' : 'none',
              position:'relative'
            }} 

            className= {isEncendido == true? "noSelect" : "noSelect"}
          >   
            <input 
              defaultValue={.5}
              
              onChange={(e) => setVolumen2(e.target.value)}

              style={{
                translate:'0 -150%', top: '50%' ,position:'relative',WebkitAppearance: 'none', 
                outline:'none', width:`100`
                
              }}  
              className="volumen"
              type="range" step={.01} min={0} max={1} >
            </input>
          </div>       
        </Html>
      </motion.mesh>
      <motion.mesh
      name="controlador de pausa"
      position={[-3.45,0.99,-0.83]}
      rotation={[0, 0, 0]}
      scale={[0.970, 0.2, 0.70]} 
      >
        <Html
          className="noSelect"
          transform
          occlude = 'blending'
          rotation={[- Math.PI /2.1, 0 , Math.PI ]}
          position={[0,0,0]}
          style={{
            height: '100px',
            width: '100px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}>
            <div 
              className= {isEncendido == true? "noSelect barra" : "noSelect"}
        
              onPointerMove={(e) => {
                if(isEncendido){
                  setFlotar(true)     
                  setMusY(-0.1)
                  setMusZ(-0.15) 
                }
              }}
              onPointerOut={(e) => { 
                  setMusY(0)
                  setMusZ(0)
              }}

              style={{width:'100%',height:'100%', backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center'}} 
              onClick={() => 
                {
                  if(isEncendido == true){
                    setGirando(isGirando => !isGirando) 
                    setPausado(pausado => !pausado)
                    setNivel(nivel => true)
                  }
                }
              } 
            >
              <div className="noSelect" src={play} style={
                  {
                    backgroundColor:'white',
                    width:'60%', 
                    height:'60%', 
                    borderRadius:'50%',
                    justifyContent:'center', 
                    alignItems:'center',
                    display: isEncendido == true? 'flex' : 'none'
                  }
                }
              >
                <img className="noSelect" style={{ pointerEvents: 'none'}} src={ pausado == false ? play : pausa} width={'103%'} height={'103%'} />
              </div>
            </div>      
        </Html>
      </motion.mesh>

    </motion.group>
  </>
  );
}
useGLTF.preload("/models/Tocadiscos2.glb");