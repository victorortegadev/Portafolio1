import '../styles/Header.css';
function Header() {
    return (
        <header>
            <div className='space'>
                <div className='home'>

                </div>
                <div className='portfolio'>
                    <p>Proyectos</p>
                    <p>Aptitudes</p>
                    <p>Educacion</p>
                </div>
            </div>
            <p className='contact'>Contacto</p>
        </header>
    );
}
export default Header;