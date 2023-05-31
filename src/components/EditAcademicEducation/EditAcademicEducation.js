import { useUserData } from '../../hooks/useUserData'
import styles from './EditAcademicEducation.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useToGoBack } from '../../hooks/useToGoBack'

const EditAcademicEducation = ({user, changeStateMenu, eID}) => {

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

    useEffect(() => {
        if(updateError) {
            setError(updateError)
        }
    }, [updateError]) 

    useEffect(() => {
        if(userDoc) {
            setNameInstitution(userDoc.academic[eID].nameInstitution)
            setCurse(userDoc.academic[eID].curse)
            setShift(userDoc.academic[eID].shift)
            setSituation(userDoc.academic[eID].situation)
            setDateInitial(userDoc.academic[eID].dateInitial)
            setDateFinal(userDoc.academic[eID].dateFinal)            
        }
        
    }, [userDoc, eID])

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

        setError('')

        if(userDoc.academic[eID].nameInstitution !== nameInstitution || userDoc.academic[eID].curse !== curse || userDoc.academic[eID].shift !== shift || userDoc.academic[eID].situation !== situation || userDoc.academic[eID].dateInitial !== dateInitial || userDoc.academic[eID].dateFinal !== dateFinal) {
            userDoc.academic[eID].nameInstitution = nameInstitution
            userDoc.academic[eID].curse = curse
            userDoc.academic[eID].shift = shift
            userDoc.academic[eID].situation = situation
            userDoc.academic[eID].dateInitial = dateInitial
            userDoc.academic[eID].dateFinal = dateFinal

            if(situation === 'Cursando') {
                userDoc.academic[eID].dateFinal = ''
            }

            updateUser(id, userDoc)

            if(!error && !updateError) {
                changeStateMenu(e)
            }

        }

    }

    return (
        <div className={styles.container}>
            <i id='3' onClick={(e) => toGoBack(e, changeStateMenu)} className="fa-solid fa-arrow-left"></i>
            <form autoComplete='off' id='3' onSubmit={handleSubmit} className={styles.form}>
                <h2>Edite Formação</h2>
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
                <button type="submit" className='btn'>
                    {loading ? <span className='loading'></span> : 'Salvar'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default EditAcademicEducation