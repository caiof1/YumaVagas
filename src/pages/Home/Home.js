import { useEffect, useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Home.module.css'

import {Link} from 'react-router-dom'


const Home = ({userDoc, user}) => {

    const [error, setError] = useState(null)

    const {documents, error: fetchError, loading} = useFetchDocuments('posts')

    

    console.log(userDoc)

    useEffect(() => {
        if(fetchError) {
            setError(fetchError)
        }
    }, [fetchError])

    return (
        <div className={styles.container}>
            {error && <span>{error}</span>}
            {documents && documents == 0 && (
                <section className={styles.vaga_create}>
                    <p>Nenhuma vaga foi criada...</p>
                    {user && userDoc.idA === 1 && (
                        <Link to="/create/posts">
                            <button className='btn'>Criar vaga</button>
                        </Link>
                    )}
                </section>
            )}
            {documents && documents.map((doc) => (
                <div key={doc.id}>
                    <h2>{doc.name}</h2>
                    <p>{doc.createBy}</p>
                    <div className={styles.info}>
                        <span>
                            {doc.model} / {doc.type}
                        </span>
                        <span>Salário: {doc.wage === '' ? 'A combinar' : doc.wage}</span>
                        <span>
                            <strong>{doc.qtd} Vaga: </strong>
                            {doc.city} - {doc.state}
                        </span>
                    </div>
                    <p className={styles.description}>{doc.description.substr(0, 330)}...</p>
                    <Link>
                        <button className='btn'>Quero me candidatar</button>
                    </Link>
                </div>
            ))}
            
        </div>
    )
}

export default Home