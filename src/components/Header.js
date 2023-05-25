import styles from './Header.module.css'
import logo from '../images/Logo.png'

// Router
import { NavLink } from 'react-router-dom'

// Hooks
import { useEffect, useState } from 'react'
import { useRegisterAuth } from '../hooks/useRegisterAuth'
import { useFetchUser } from '../hooks/useFetchUser'



const Header = ({user}) => {

    const [moveBar, setMoveBar] = useState('')

    const {logout} = useRegisterAuth()

    const [uid, setUID] = useState('')

    useEffect(() =>{
        if(user) {
            setUID(user.uid)
        } else {
            setUID('')
        }
    }, [user])
 
    
    const {userDoc} = useFetchUser('users', uid)

    const handleBarMove = () => {
        if(moveBar === 'active') {
            setMoveBar('');
        } else {
            setMoveBar('active');
        }
    }   

    const logoutAndMoveBar = () => {
        logout()
        handleBarMove()
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <img src={logo} width="70px" alt="" />
                    </NavLink>
                </div>
                {user && (
                    <NavLink to="/profile" className={styles.profile}>
                        <i className="fa-regular fa-user"></i>
                    </NavLink> 
                )}
                <div className={styles.bar}>
                    <i onClick={handleBarMove} className="fa-solid fa-bars"></i>
                </div>
                <ul className={moveBar === 'active' ? styles.active : ''}>
                    <li>
                        <NavLink onClick={handleBarMove} to="/">Home</NavLink>
                    </li>
                    {user && uid === userDoc.uid && userDoc.idA === 1 && (
                        <li>
                            <NavLink onClick={handleBarMove} to="/create/posts">Criar vaga</NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink onClick={handleBarMove} to={user && userDoc.idA === 0 ? '/dashboard/user' : '/dashboard/company'}>Dashboard</NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button onClick={logoutAndMoveBar} id='logout' className='btn_outline'>Sair</button>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink onClick={handleBarMove} to="/login">Login</NavLink>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <NavLink onClick={handleBarMove} to="/register">Cadastro</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header