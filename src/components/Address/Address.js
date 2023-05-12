import { useUserData } from '../../hooks/useUserData'
import styles from './Address.module.css'

import { useState, useEffect } from 'react'

import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useMessage } from '../../hooks/useMessage'
import { useFetchCEP } from '../../hooks/useFetchCEP'

const PersonalData = ({user}) => {

    const {userDoc, id} = useUserData(user)

    const [error, setError] = useState(null)

    const {messageExist, message, messageAtt} = useMessage()

    const {searchCEP, loading: loadingCEP} = useFetchCEP()

    let cepInitial
    let cepEnd

    const [cep, setCep] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [road, setRoad] = useState('')
    const [number, setNumber] = useState('')

    const {updateUser, loading, error: updateError} = useUpdateUser('users')

    useEffect(() => {
        if(updateError) {
            setError(updateError)
        }
    }, [updateError]) 

    useEffect(() => {
        setCep(userDoc.cep)
        setState(userDoc.stateCEP)
        setCity(userDoc.city)
        setNeighborhood(userDoc.neighborhood)
        setRoad(userDoc.road)
        setNumber(userDoc.numberCEP)
    }, [userDoc])

    const handleChangeCEP = async (e) => {
        setCep(e.target.value)

        const cepAdjusting = e.target.value

        console.log(e.target.value)

        if(cep && cepAdjusting.length === 8) {
            cepInitial = cepAdjusting.substring('0', '5')
            cepEnd = cepAdjusting.substring('5', '8')    
        }

        let cepFinnaly

        if(!e.target.value.includes('-')) {
            cepFinnaly = cepInitial + '-' + cepEnd
        } else {
            cepFinnaly = e.target.value
        }

        if(cep && cepFinnaly.length == 9) {
            const returnCEP = await searchCEP(cepFinnaly)
            if(returnCEP.status === 200) {
                setCity(returnCEP.city)
                setState(returnCEP.state)
                setNeighborhood(returnCEP.district)
                setRoad(returnCEP.address)
            }
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(userDoc.cep != cep || userDoc.stateCEP != state || userDoc.city != city || userDoc.neighborhood != neighborhood || userDoc.road != road || userDoc.numberCEP != number) {
            userDoc.cep = cep
            userDoc.stateCEP = state
            userDoc.city = city
            userDoc.neighborhood = neighborhood
            userDoc.road = road
            userDoc.numberCEP = number


            updateUser(id, userDoc)

            if(!error) {
                messageAtt('Dados atualizados')
            }
            
        }
    }

    return (
        <div className={styles.container}>
            {messageExist && (
                <div className='message'>
                    <span>{message}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Endereço</h2>
                <label>
                    <span>CEP:</span>
                    <input type="text" name="cep" placeholder='Digite o seu CEP' value={cep} onChange={handleChangeCEP} />
                </label>
                <label>
                    <span>Estado:</span>
                    <input type="text" name="state" placeholder='Digite o seu estado' value={state} onChange={(e) => setState(e.target.value)} />
                </label>
                <label>
                    <span>Cidade:</span>
                    <input type="text" name="city" placeholder='Digite a seu cidade' value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <label>
                    <span>Bairro:</span>
                    <input type="text" name="neighborhood" placeholder='Digite o seu bairro' value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                </label>
                <label>
                    <span>Rua:</span>
                    <input type="text" name="road" placeholder='Digite a sua rua' value={road} onChange={(e) => setRoad(e.target.value)} />
                </label>
                <label>
                    <span>Número:</span>
                    <input type="text" name="number" placeholder='Digite o número da sua casa' value={number} onChange={(e) => setNumber(e.target.value)} />
                </label>
                <input type="submit" value="Salvar" className='btn' />
                {error && <p>{error}</p>}
                {loading && <span className='loading'></span>}
                {loadingCEP && <span className='loading'></span>}
            </form>
        </div>
    )
}

export default PersonalData