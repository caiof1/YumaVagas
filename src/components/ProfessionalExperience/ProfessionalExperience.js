import { useUserData } from '../../hooks/useUserData'
import styles from './ProfessionalExperience.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useToGoBack } from '../../hooks/useToGoBack'

const ProfessionalExperience = ({user, changeStateMenu}) => {

    const {userDoc, id} = useUserData(user)

    const [error, setError] = useState(null)

    const {toGoBack} = useToGoBack()

    const [nameCompany, setNameCompany] = useState('')
    const [charge, setCharge] = useState('')
    const [functionCompany, setFunctionCompany] = useState('')
    const [assignments, setAssignments] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    
    const {updateUser, loading, error: updateError} = useUpdateUser('users')

    let profissionalEXP = [];

    useEffect(() => {
        if(updateError) {
            setError(updateError)
        }
    }, [updateError]) 

    const handleChangeDateInitial = (e) => {
        setDateInitial(e.target.value)

        if(e.target.value.length === 2) {
            setDateInitial(e.target.value + '/')
        } else if(e.target.value.length === 5) {
            setDateInitial(e.target.value + '/')
        }
    }

    const handleChangeDateFinal = (e) => {
        setDateFinal(e.target.value)

        if(e.target.value.length === 2) {
            setDateFinal(e.target.value + '/')
        } else if(e.target.value.length === 5) {
            setDateFinal(e.target.value + '/')
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        setError(null)

        if(charge === '') {
            setError('Preencha o cargo')
            return;
        }

        profissionalEXP = {nameCompany, charge, functionCompany, assignments, dateInitial, dateFinal}

        userDoc.profissional.push(profissionalEXP)

        updateUser(id, userDoc)

        if(!error && !updateError) {
            changeStateMenu(e)
        }

    }

    return (
        <div className={styles.container}>
            <i id='4' onClick={(e) => toGoBack(e, changeStateMenu)} className="fa-solid fa-arrow-left"></i>
            <form autoComplete='off' id='4' onSubmit={handleSubmit} className={styles.form}>
                <h2>Profissional</h2>
                <label>
                    <span>Empresa:</span>
                    <input type="text" name="nameCompany" required placeholder='Digite o nome da empresa' value={nameCompany} onChange={(e) => setNameCompany(e.target.value)} />
                </label>
                <label>
                    <span>Cargo:</span>
                    <select name="charge" className={styles.select} value={charge} onChange={(e) => setCharge(e.target.value)}>
                        <option value="" disabled>- - - Selecione - - -</option>
                        <option value="Estágio">Estágio</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Jovem Aprendiz">Jovem aprendiz</option>
                    </select>
                </label>
                <label>
                    <span>Função:</span>
                    <input type="text" name="functionCompany" required placeholder='Digite sua função' value={functionCompany} onChange={(e) => setFunctionCompany(e.target.value)} />
                </label>
                <label>
                    <span>Descrição da vaga:</span>
                    <textarea type="text" name="assignments" required placeholder='Digite a descrição da vaga' value={assignments} onChange={(e) => setAssignments(e.target.value)} />
                </label>
                <div className={styles.dates}>
                    <label>
                        <span>Inicio:</span>
                        <input type="text" name="dateInitial" maxLength={10} required placeholder='Quando entrou na empresa?' value={dateInitial} onChange={handleChangeDateInitial} />
                    </label>
                    <label>
                        <span>Fim:</span>
                        <input type="text" name="dateFinal" maxLength={10} placeholder='Quando saiu da empresa?' value={dateFinal} onChange={handleChangeDateFinal} />
                        <span>*Deixe em branco caso ainda esteja na empresa*</span>
                    </label>
                </div>
                <button type="submit" className='btn'>
                    {loading ? <span className='loading'></span> : 'Salvar'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default ProfessionalExperience