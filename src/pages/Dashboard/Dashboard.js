import styles from './Dashboard.module.css'

import { useFetchUser } from '../../hooks/useFetchUser'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useEffect, useState } from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { Link } from 'react-router-dom'

const Dashboard = ({user}) => {

    const {userDoc, id} = useFetchUser('users', user && user.uid)

    const [document, setDocument] = useState([])
    
    const {documents} = useFetchDocuments('posts')

    const {updateUser} = useUpdateUser('users')

    const {updateUser: updateDoc} = useUpdateUser('posts')

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        setUpdate(false)
        setDocument([])
        if(userDoc.apply) {
            userDoc.apply.map((doc) => {
                setDocument((actualDocuments) => [
                    ...actualDocuments,
                    documents.filter(documen => documen.id === doc)
                ])
            })
            
        }

    }, [userDoc, documents, update])

    

    const handleDeleteApply = (idPost) => {
        if(userDoc.apply) {
            const indiceArray = userDoc.apply.indexOf(idPost)
            if(indiceArray !== -1) {
                userDoc.apply.splice(indiceArray, 1)
            }
        }
        let indiceDocument
        console.log(idPost)
        documents.map((doc) => {
            const refIndex = doc.id.indexOf(idPost)
            if(refIndex !== -1) {
                indiceDocument = doc
            }
        })

        if(documents[documents.indexOf(indiceDocument)].apply) {
            const indiceArray = documents[documents.indexOf(indiceDocument)].apply.indexOf(id)
            if(indiceArray !== -1) {
                documents[documents.indexOf(indiceDocument)].apply.splice(indiceArray, 1)
            }
        }

        updateUser(id, userDoc)
        updateDoc(idPost, documents)
        
        setUpdate(true)

        console.log(document)
    }

    return (
        <div className={styles.container_dashboard}>
            {userDoc && userDoc.apply.length === 0 && (
                <>
                    <p className='noposts'>Você não se candidatou em nenhuma vaga </p>
                    <Link to="/">
                        <button className='btn_outline'>Voltar</button>
                    </Link>
                </>
            )}
            {userDoc && documents && document && document.map((doc) => (
                <section key={doc[0].id}>
                    <section>
                        <div>
                            <span>{doc[0].name}</span>
                        </div>
                        <div>
                            <span>status...</span>
                        </div>
                    </section>
                    <div>
                        <button className='btn_outline'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button onClick={() => handleDeleteApply(doc[0].id)} className='btn_outline'>X</button>
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Dashboard