// CSS
import styles from './Search.module.css'

// hooks
import { useSearchDocument } from '../../hooks/useSearchDocument'
import { useQuery } from "../../hooks/useQuery"
import { useEffect, useState } from 'react'

import VacancyScreen from '../../components/VacancyScreen/VacancyScreen'
import SearchFunctionality from '../../components/SearchFunctionality/SearchFunctionality'


const Search = ({user}) => {

    const query = useQuery()
    const search = query.get('q')

    const {documents, error} = useSearchDocument('posts', search);

    const [posts, setPosts] = useState([]) 

    useEffect(() => {
        setPosts([])
        if(documents) {
            documents.map((doc) => {
                if(
                    doc.name.toUpperCase().includes(search.toUpperCase()) ||
                    doc.city.toUpperCase().includes(search.toUpperCase()) ||
                    doc.createBy.toUpperCase().includes(search.toUpperCase()) ||
                    doc.description.toUpperCase().includes(search.toUpperCase()) ||
                    doc.model.toUpperCase().includes(search.toUpperCase()) ||
                    doc.state.toUpperCase().includes(search.toUpperCase()) ||
                    doc.type.toUpperCase().includes(search.toUpperCase())
                ) {
                    setPosts((actualPosts) => [
                        ...actualPosts,
                        doc
                    ])
                }    
            })
        }
    }, [documents, search])


    return (
        <div className={styles.search_container}> 
            <SearchFunctionality />
            <p className={styles.result}>Resultado da pesquisa: <span>{search}</span></p>
            {documents && <VacancyScreen error={error} documents={posts} user={user} message='Nenhuma vaga foi encontrada...' /> }
        </div>
    )
}

export default Search