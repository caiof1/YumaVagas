import { useEffect, useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Home.module.css'

import VacancyScreen from '../../components/VacancyScreen/VacancyScreen'
import SearchFunctionality from '../../components/SearchFunctionality/SearchFunctionality'



const Home = ({user}) => {

    const [error, setError] = useState(null)

    const {documents, error: fetchError} = useFetchDocuments('posts')

    useEffect(() => {
        if(fetchError) {
            setError(fetchError)
        }
    }, [fetchError])

    return (
        <div className={styles.container}>
            <SearchFunctionality />
            <VacancyScreen error={error} documents={documents} user={user} message='Nenhuma vaga criada...' /> 
        </div>
    )
}

export default Home