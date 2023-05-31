import { useUserData } from '../../hooks/useUserData'
import styles from './PersonalData.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useMessage } from '../../hooks/useMessage'

const PersonalData = ({user}) => {

    const {userDoc, id} = useUserData(user)

    const [error, setError] = useState(null)

    const {messageExist, message, messageAtt} = useMessage()

    const [number, setNumber] = useState('')
    const [gen, setGen] = useState('')
    const [state, setState] = useState('')
    const [portfolio, setPortfolio] = useState('')
    const [linkedin, setLinkedin] = useState('')

    const {updateUser, loading, error: updateError} = useUpdateUser('users')

    useEffect(() => {
        if(updateError) {
            setError(updateError)
        }
    }, [updateError]) 

    useEffect(() => {
        setNumber(userDoc.number)
        setGen(userDoc.gen)
        setState(userDoc.state)
        setPortfolio(userDoc.portfolio)
        setLinkedin(userDoc.linkedin)
    }, [userDoc])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(userDoc.number !== number || userDoc.gen !== gen || userDoc.state !== state || userDoc.portfolio !== portfolio || userDoc.linkedin !== linkedin) {
            userDoc.number = number
            userDoc.gen = gen
            userDoc.state = state
            userDoc.portfolio = portfolio
            userDoc.linkedin = linkedin

            updateUser(id, userDoc)

            if(!error) {
                messageAtt('Dados atualizados')
            }
            
        }
    }

    return (
        <div className={styles.container}>
            {messageExist && <span className='message'>{message}</span>}
            <form autoComplete='off' onSubmit={handleSubmit} className={styles.form}>
                <h2>Dados pessoais</h2>
                <label>
                    <span>Número:</span>
                    <input type="number" name="telphone" placeholder='Digite seu número de telefone' value={number} onChange={(e) => setNumber(e.target.value)} />
                </label>
                <label>
                    <span>Gênero:</span>
                    <select name="gen" className='select' value={gen} onChange={(e) => setGen(e.target.value)}>
                        <option value="" disabled>- - - Selecione Gênero - - -</option>
                        <option value="1">Feminino</option>
                        <option value="2">Masculino</option>
                    </select>
                </label>
                <label>
                    <span>Estado civil:</span>
                    <select name="state" className='select' value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="" disabled>- - - Selecione Estado Civil - - -</option>
                        <option value="1">Solteiro</option>
                        <option value="2">Casado</option>
                        <option value="3">Viúvo</option>
                        <option value="4">Separado</option>
                        <option value="5">Divorciado</option>
                    </select>
                </label>
                <label>
                    <span>Portfolio:</span>
                    <input type="text" name="portfolio" placeholder='Coloque aqui o link do seu portfolio' value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                </label>
                <label>
                    <span>Linkedin:</span>
                    <input type="text" name="linkedin" placeholder='Coloque aqui o link do seu linkedin' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </label>
                <button type="submit" className='btn'>
                    {loading ? <span className='loading'></span> : 'Salvar'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default PersonalData