import styles from './NotFound.module.css'

// Router
import {NavLink} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={styles.container}>
        <i className="fa-regular fa-face-frown"></i>
        <h2>Página não encontrada</h2>
        <NavLink to="/">
            <button className='btn'>Voltar</button>
        </NavLink>
    </div>
  )
}

export default NotFound