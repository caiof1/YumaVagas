import { useUserData } from '../../hooks/useUserData'
import styles from './PersonalDataCompany.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useMessage } from '../../hooks/useMessage'

const PersonalDataCompany = ({user}) => {

    const {userDoc, id} = useUserData(user)

    const [error, setError] = useState(null)

    const {messageExist, message, messageAtt} = useMessage()

    const [number, setNumber] = useState('')
    const [qtdStaff, setQtdStaff] = useState('')
    const [carry, setCarry] = useState('')
    const [emailContact, setEmailContact] = useState('')
    const [linkedin, setLinkedin] = useState('')

    const {updateUser, loading, error: updateError} = useUpdateUser('users')

    useEffect(() => {
        if(updateError) {
            setError(updateError)
        }
    }, [updateError]) 

    useEffect(() => {
        setNumber(userDoc.number)
        setQtdStaff(userDoc.qtdStaff)
        setCarry(userDoc.carry)
        setEmailContact(userDoc.emailContact)
        setLinkedin(userDoc.linkedin)
    }, [userDoc])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(userDoc.number !== number || userDoc.qtdStaff !== qtdStaff || userDoc.carry !== carry || userDoc.emailContact !== emailContact || userDoc.linkedin !== linkedin) {
            userDoc.number = number
            userDoc.qtdStaff = qtdStaff
            userDoc.carry = carry
            userDoc.emailContact = emailContact
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
                <h2>Dados empresa</h2>
                <label>
                    <span>Número:</span>
                    <input type="number" name="telphone" placeholder='Digite o número da empresa' value={number} onChange={(e) => setNumber(e.target.value)} />
                </label>
                <label>
                    <span>Qtd funcionários:</span>
                    <input type="number" name="qtdStaff" placeholder='Digite a quantidade de funcionários' value={qtdStaff} onChange={(e) => setQtdStaff(e.target.value)} />
                </label>
                <label>
                    <span>Porte da empresa:</span>
                    <select name="carry" className='select' value={carry} onChange={(e) => setCarry(e.target.value)}>
                        <option value="" disabled>- - - Selecione Porte da empresa - - -</option>
                        <option value="1">Pequeno porte</option>
                        <option value="2">Médio porte</option>
                        <option value="3">Grande porte</option>
                    </select>
                </label>
                <label>
                    <span>Email de contato:</span>
                    <input type="email" name="emailContact" placeholder='E-mail de contato da empresa' value={emailContact} onChange={(e) => setEmailContact(e.target.value)} />
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

export default PersonalDataCompany