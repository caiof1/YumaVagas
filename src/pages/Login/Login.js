import { useEffect, useState } from 'react'

import { Link} from 'react-router-dom'

import styles from './Login.module.css'
import { useLoginAuth } from '../../hooks/useLoginAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const {login, error: authError, loading} = useLoginAuth()

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])


  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(null)

    const user = {
      email,
      password
    }

    await login(user)
  }


  return (
    <div className={styles.login}>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.login_container}>
          <div className={styles.profile}>
            <i className="fa-regular fa-user"></i>
          </div>
          <h2>Login</h2>
          <label>
              <span>E-mail</span>
              <input type="email" name="email" required placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
              <i className="fa-regular fa-envelope"></i>
          </label>
          <label>
              <span>Senha</span>
              <input type="password" name="password" required placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className="fa-solid fa-lock"></i>
          </label>
          {error && <p>{error}</p>}
          {loading && <span className='loading'></span>}
          <input type="submit" value="Entrar" className='btn' />
          <Link to="/register">Não possui cadastro? Cadastre-se aqui!</Link>
      </form>
  </div>
    )
}

export default Login