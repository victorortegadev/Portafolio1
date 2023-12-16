import {useEffect, useRef, useState } from 'react';
import '../styles/Template.css';
import Main from './Main';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { White } from './White';

import gsap from "gsap";

function Template() {

  const { scrollYProgress } = useScroll()
  const {scrollY} = useScroll()

  const color = 80 / 0.03

  const [gradient, setGradient] = useState(80)
  const [cuad, setCuad] = useState('initial')

  const [proyectosTitulo, setProyectosTitulo] = useState([ `black`,'none'])
  const [abtitudesTitulo, setAbtitudesTitulo] = useState([ `black`,'none'])
  const [contactoTitulo, setContactoTitulo] = useState([ `black`,'none'])

  const [posiProjec ,setPosiProjec] = useState(['sticky', '10px'])
  const [posiAbti ,setPosiAbti] = useState(['sticky', '10px'])
  const [posiContac ,setPosiContac] = useState(['sticky', '10px'])

  const [mediProjS, setMediProjS] = useState()
  const [mediAbtiS, setMediAbtiS] = useState()
  const [mediContS, setMediContS] = useState()                                          

  const mediProj = useRef()
  const mediAbti = useRef()
  const mediCont = useRef()

  const [fontP, setFontP] = useState('1.8em')
  const [fontA, setFontA] = useState('1.8em')
  const [fontC, setFontC] = useState('1.8em')

  const [anchuraP, setAnchuraP] = useState()
  const [anchuraA, setAnchuraA] = useState()
  const [anchuraC, setAnchuraC] = useState()
  useEffect(() =>  {setAnchuraP( mediProj.current.offsetWidth)},[]) 
  useEffect(() =>  {setAnchuraA( mediAbti.current.offsetWidth)},[]) 
  useEffect(() =>  {setAnchuraC( mediCont.current.offsetWidth)},[]) 

  const [translateA, setTranslateA] = useState('')
  const [translateC, setTranslateC] = useState('')

  const [claseC, setClaseC] = useState('')
  const [claseMarT, setClaseMarT] = useState('marT')

  useMotionValueEvent(scrollYProgress, "change", (latest) => { 

    if( latest <= 0.07 && latest >= 0.04)
    {
        let porcentaje = color * (latest - 0.04)
        let pru = (80 - porcentaje )
        setGradient(pru)
    }
    if (latest > 0.07) {
        setGradient(0)
    }
    if (latest < 0.04) {
        setGradient(80)
    }
    if (latest >= 0.055) {
        setGradient(0)
      
    }

    if(scrollY.get() >= 97 ){
      setProyectosTitulo([ `linear-gradient(black ${gradient}%, white 0%)`,'none'])
    }

    if(scrollY.get() >= 97  ){
      setAbtitudesTitulo([ `linear-gradient(black ${gradient}%, white 0%)`,'none'])
    }
    /////////////////////////////////Parte de Flota Projecto (el useEffect de abajo no lo detecta asi que lo pongo aqui)////////////////////
    if(scrollYProgress.get() < 0.019002375296912115) {
      setFontP('1.8em')  
    }
  })

  useEffect(()=> { 
    
    if(scrollY.get() >= 155){
      setCuad('none')
      setClaseC('porText3')
      setClaseMarT('')
    }
    if(scrollY.get() <= 155){
      setClaseC('')
      setClaseMarT('marT')
    }
    ////////////////////////////Flota Projecto////////////////////////////////////
    if(scrollYProgress.get() >= 0.1 && scrollYProgress.get() <= 0.39  )
    {
      setFontP('4em')
      setPosiProjec(['relative', `122.8vh`])
      setMediProjS( `17.2vw`)
    }else{
      if(scrollYProgress.get() >= 0.019002375296912115)
      { 
        setFontP('1.4em')
      }  
      let numeroP = contactoTitulo[0] == 'white' ? anchuraC : 40

      setMediProjS(`calc(100% - ${ anchuraP  + anchuraA  + numeroP}px - 0em)`)
      setPosiProjec(['sticky', '10px'])
    }
    /////////////////////////////////Flota abtitudes///////////////////////////
    if(scrollYProgress.get() >= 0.42 && scrollYProgress.get() <= 0.67  )
    {
      setFontA('3em')
      setPosiAbti(['relative', `215vh`])
      setMediAbtiS( `50%`)
      setTranslateA('translateX(-50%)')

    }else{
      if(scrollYProgress.get() >= 0.019002375296912115)
      { 
        setFontA('1.4em')  
      }else{
        setFontA('1.8em')  
      }

      let numeroA = contactoTitulo[0] == 'white' ? anchuraC : 20

      setTranslateA('')
      setPosiAbti(['sticky', '10px'])
      setMediAbtiS(`calc(100% - ${ anchuraA  + numeroA }px - 0em)`)
    }
    /////////////////////////////////Flota Contacto///////////////////////////
    if(scrollYProgress.get() >= 0.75)
    {
      setFontC('3em')
      setPosiContac(['relative', `310vh`])
      setMediContS( `50%`)
      setTranslateC('translateX(-50%)')

    }else{
      setFontC('1.4em')

      setTranslateC('')
      setMediContS(`calc(100% - ${anchuraC + 10}px - 0em)`)
      setPosiContac(['sticky', '10px'])
    }
    ///////////////////////////////////////////////////////////////////////////////////
    if(scrollY.get() < 97){
      setProyectosTitulo(['black', 'none'])
      setAbtitudesTitulo(['black', 'none'])
    }
    if(scrollY.get() > 127){
      setProyectosTitulo(['white', 'none'])
      setAbtitudesTitulo(['white', 'none'])
    }
    ////////////////////////////////////////////////////////////////////////////////////
    if(scrollY.get() < 155){
      setCuad('initial')
      setContactoTitulo([ `transparent`,'none'])
    }else {
      setContactoTitulo(['white'])
    }
    //////////////////////////////////////////////////////////////////////////////////////////
  }, [scrollY.get(), contactoTitulo[0]])


    const timeline = useRef()
    timeline.current = gsap.timeline()

    useEffect(() => {
        timeline.current.to(
          mediProj.current.style, 
          {      
            
            top:  posiProjec[1],
            duration: 0.5,
          }
        )
        timeline.current.to(
          mediAbti.current.style, 
          {      
            top: posiAbti[1],
            duration: 0.2
          }
        )
        timeline.current.to(
          mediCont.current.style, 
          {      
            top: posiContac[1],
            duration: 0.2
          }
        )
      })


     return (
      <motion.div className="Template"

        style={{gridTemplateRows: 'repeat(4, 0px) 1fr 10px'}}
      >       
        <motion.div  onClick={() =>{  window.scroll( { top: 0, behavior: "smooth",} ) } } className='homeP'>Home</motion.div>

        <motion.div onClick={() =>{  window.scroll( { top: ((window.innerHeight / 100) * 102 + 20)  ,behavior: "smooth",} ) } } ref={mediProj} className= {`porText porText2 ${claseMarT}`}  style={{left: mediProjS, position: posiProjec[0], background: proyectosTitulo[0], fontSize:fontP}}><motion.div className='cuadri' style={{display: cuad}}/>Proyectos</motion.div>
        <motion.div onClick={() =>{  window.scroll( { top: ((window.innerHeight / 100) * 199 + 20)  ,behavior: "smooth",} ) } }  ref={mediAbti} className= {`porText porText2 ${claseMarT}`} style={{left: mediAbtiS, position: posiAbti[0], background: abtitudesTitulo[0], fontSize:fontA, transform: translateA }}><motion.div className='cuadri' style={{display: cuad}}/>Aptitudes</motion.div>
        <motion.div onClick={() =>{  window.scroll( { top: ((window.innerHeight / 100) * 296 + 20)  ,behavior: "smooth",} ) } } ref={mediCont} className= {`porText ${claseC} ${claseMarT}`} style={{left: mediContS, position: posiContac[0], background: contactoTitulo[0], fontSize:fontC, transform:translateC}}><motion.div  className='cuadri' style={{display: 'none', background: 'transparent'}}/>Contacto</motion.div>
    
        <Main/>
        <White/>  
      </motion.div>
    );
}
export default Template; 