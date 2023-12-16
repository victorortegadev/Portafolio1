import '../styles/Header.css';
import { motion} from 'framer-motion';

function Header() {
    return (
        <header> 
            <motion.div className='space'>
                <motion.div className='home'/>
                             
                <motion.div className='identidad'>
                    <div>
                        <motion.p className='nombre'> Victor Ortega </motion.p>
                        <motion.p className='ocupacion'> Desarrollador Web </motion.p>
                    </div> 
                    <motion.p onClick={() =>{  window.scroll( { top: ((window.innerHeight / 100) * 296 + 20)  ,behavior: "smooth",} ) } } className='contacto' >Contacto</motion.p>
                </motion.div>
            </motion.div>         
        </header>
    );
}
export default Header;