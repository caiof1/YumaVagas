import { useState, useEffect } from 'react'
import styles from './Register.module.css'

// router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useRegisterAuth } from '../../hooks/useRegisterAuth'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    const [error, setError] = useState(null)

    const {createUser, error: authError, loading} = useRegisterAuth();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null)

        if(password !== confirmPassword) {
            setError('As senhas não correspondem');
            return;
        }

        const user = {
            email,
            password,
            name,
            idA: 0
        }

        await createUser(user)

        navigate('/')
    }

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])


    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit} className={styles.register_container}>
            <h2>Registro</h2>
                <label>
                    <span>Nome</span>
                    <input type="text" name="name" required placeholder='Digite seu nome' value={name} onChange={(e) => setName(e.target.value)} />
                    <i class="fa-regular fa-user"></i>
                </label>
                <label>
                    <span>E-mail</span>
                    <input type="email" name="email" required placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <i class="fa-regular fa-envelope"></i>
                </label>
                <label>
                    <span>Senha</span>
                    <input type="password" name="password" required placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i class="fa-solid fa-lock"></i>
                </label>
                <label>
                    <span>Confirme a senha</span>
                    <input type="password" name="confirmPassword" required placeholder='Confirme a sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <i class="fa-solid fa-lock"></i>
                </label>
                {error && <p>{error}</p>}
                {loading && <span className='loading'></span>}
                <input type="submit" value="Registrar" className='btn' />
                <Link to="/login">Já possui cadastro? Faça login!</Link>
                <Link to="/register/company">É uma empresa? Faça cadastro como uma</Link>
            </form>
        </div>
    )
}

export default Register