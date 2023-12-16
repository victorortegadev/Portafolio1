import '../styles/Main.css';
import { Suspense} from 'react';
import Scene from './Scene';
import { motion} from 'framer-motion';
import Header from './Header';
import Footer from './footer';

function Main() {

    const variantes = {
        opacity:{opacity:[0.4,0.6,1], transition:{duration:2,times: [0.4,0.6,1] }}
    } 

    return (
        <main>  
            <Header/> 
            <motion.div
                className='disco'
                variants={variantes} animate='opacity'
            >    
                <motion.div 
                    className='forma'
                 
                >
                    <Suspense fallback = {null}>
                        <Scene/>
                    </Suspense>
                </motion.div>

            </motion.div>
            <div className='lugar'></div>
            <motion.div className='proyectos'>  
                <div className='tiP'>Proyectos</div> 
                <motion.div className='cajaP'>
                    <motion.div className='fotoP P1' ></motion.div>
                    <motion.div className='fotoP P2' ></motion.div>
                    <motion.div className='fotoP P3' ></motion.div>
                    <motion.div className='fotoP P4'></motion.div>
                    <motion.div className='fotoP P5' ></motion.div>
                    <motion.div className='fotoP P6' ></motion.div>   
                    <motion.div className='fotoP P7' ></motion.div>
                    <motion.div className='fotoP P8'></motion.div>  
                </motion.div> 
            </motion.div>
            <motion.div className='aptitudes'> 
                <div className='tiA'>Aptitudes</div>   
                <motion.div className='cajaA'>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                    <motion.div className='fotoA'></motion.div>
                </motion.div>       
            </motion.div>
            <motion.div className='contactoP'> 
                <div className='tiC'>Contacto</div> 
                <motion.div className='cajaC'>    
                    <form action="" method="">
                        <label>Your email: <input type="email" name="email"/></label> 
                        <label>Your message: <textarea name="message"></textarea></label> 
                        <button type="submit">Send</button>
                    </form>
                </motion.div>      
            </motion.div>
            <Footer/>
        </main>
    );
}
export default Main;
