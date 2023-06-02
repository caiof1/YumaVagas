import { useParams } from 'react-router-dom'
import styles from './ViewCandidate.module.css'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useEffect, useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const ViewCandidate = () => {

    const {id} = useParams()

    const {document} = useFetchDocument('posts', id)

    const [users, setUsers] = useState([])

    const {documents} = useFetchDocuments('users')

    useEffect(() => {
        setUsers([])
        if(document.apply) {
            document.apply.map((doc) => {
                setUsers((actualUsers) => [
                    ...actualUsers,
                    documents.filter(element => element.id === doc)
                ])
            })
        }
    }, [document, documents])

    console.log(users)

    return (
        <div className={styles.container}>
            <section>
                <h2>Candidatos</h2>
                {document && documents && users.length === 0 && (
                    <span className='noposts'>Não tem candidato</span>
                )}
                {document && documents && users && users.map((user) => (
                    <section>
                        <span>{user[0].name}</span>
                        <span>{user[0].email}</span>
                    </section>
                ))}
            </section>
        </div>
    )
}

export default ViewCandidate