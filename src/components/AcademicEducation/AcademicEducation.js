import { useUserData } from '../../hooks/useUserData'
import styles from './AcademicEducation.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useToGoBack } from '../../hooks/useToGoBack'

const AcademicEducation = ({user, changeStateMenu}) => {

    const {userDoc, id} = useUserData(user)

    const [error, setError] = useState(null)

    const {toGoBack} = useToGoBack()

    const [nameInstitution, setNameInstitution] = useState('')
    const [curse, setCurse] = useState('')
    const [shift, setShift] = useState('')
    const [situation, setSituation] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    
    const {updateUser, loading, error: updateError} = useUpdateUser('users')

    let academicForm = [];

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

        if(shift === '' || situation === '') {
            setError('Faltou preencher o turno ou situação')
            return;
        }

        academicForm = {nameInstitution, curse, shift, situation, dateInitial, dateFinal}

        userDoc.academic.push(academicForm)

        updateUser(id, userDoc)

        if(!error && !updateError) {
            changeStateMenu(e)
        }

    }

    return (
        <div className={styles.container}>
            <i id='3' onClick={(e) => toGoBack(e, changeStateMenu)} className="fa-solid fa-arrow-left"></i>
            <form autoComplete='off' id='3' onSubmit={handleSubmit} className={styles.form}>
                <h2>Formação</h2>
                <label>
                    <span>Instituição:</span>
                    <input type="text" name="nameInstitution" required placeholder='Digite o nome da instituição' value={nameInstitution} onChange={(e) => setNameInstitution(e.target.value)} />
                </label>
                <label>
                    <span>Curso:</span>
                    <input type="text" name="curse" required placeholder='Digite o nome do curso' value={curse} onChange={(e) => setCurse(e.target.value)} />
                </label>
                <label>
                    <span>Turno:</span>
                    <select name="shift" value={shift} onChange={(e) => setShift(e.target.value)}>
                        <option value="">- - - Selecione - - -</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noturno">Noturno</option>
                        <option value="EAD">EAD</option>
                    </select>
                </label>
                <label>
                    <span>Situação:</span>
                    <select name="situation" value={situation} onChange={(e) => setSituation(e.target.value)}>
                        <option value="">- - - Selecione - - -</option>
                        <option value="Interrompido">Interrompido</option>
                        <option value="Cursando">Cursando</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </label>
                <div className={styles.dates}>
                    <label>
                        <span>Inicio:</span>
                        <input type="text" name="dateInitial" maxLength={10} required placeholder='Quando iniciou?' value={dateInitial} onChange={handleChangeDateInitial} />
                    </label>
                    {situation !== 'Cursando' && (
                        <label>
                            <span>Fim:</span>
                            <input type="text" name="dateFinal" required maxLength={10} placeholder='Quando terminou?' value={dateFinal} onChange={handleChangeDateFinal} />
                        </label>
                    )}
                </div>
                <input type="submit" value="Salvar" className='btn' />
                {error && <p>{error}</p>}
                {loading && <span className='loading'></span>}
            </form>
        </div>
    )
}

export default AcademicEducation