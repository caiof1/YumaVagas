import styles from './Dashboard.module.css'

import { useFetchUser } from '../../hooks/useFetchUser'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useEffect, useState } from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { Link, useNavigate } from 'react-router-dom'
import { useMessage } from '../../hooks/useMessage'

const Dashboard = ({user}) => {

    const {userDoc, id} = useFetchUser('users', user && user.uid)

    const [document, setDocument] = useState([])
    
    const {documents} = useFetchDocuments('posts')

    const {updateUser} = useUpdateUser('users')

    const {updateUser: updateDoc} = useUpdateUser('posts')

    const [update, setUpdate] = useState(false)

    const {messageExist, message, messageAtt} = useMessage()

    const navigate = useNavigate()

    useEffect(() => {
        setUpdate(false)
        setDocument([])
        if(userDoc.apply) {
            userDoc.apply.map((doc) => {
                setDocument((actualDocument) => [
                    ...actualDocument,
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
        documents.map((doc) => {
            const refIndex = doc.id.indexOf(idPost)
            if(refIndex !== -1) {
                indiceDocument = doc
            }
        })
        let singleDocument = {}
        if(documents[documents.indexOf(indiceDocument)].apply) {
            const indiceArray = documents[documents.indexOf(indiceDocument)].apply.indexOf(id)
            if(indiceArray !== -1) {
                documents[documents.indexOf(indiceDocument)].apply.splice(indiceArray, 1)
                singleDocument = documents[documents.indexOf(indiceDocument)]
            }
        }

        updateUser(id, userDoc)
        updateDoc(idPost, singleDocument)
        
        setUpdate(true)
        messageAtt('Candidatura excluída')
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
                <section key={doc[0].id} className={doc[0].statusPost === 'Fim' && styles.end_vacancy}>
                    <section>
                        <div>
                            <span>{doc[0].name}</span>
                        </div>
                        <div>
                            <span>{doc[0].statusPost}</span>
                        </div>
                    </section>
                    <div>
                        <button className='btn_outline' onClick={() => navigate(`/detail_vacancy/${doc[0].id}`)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button onClick={() => handleDeleteApply(doc[0].id)} className='btn_outline'>X</button>
                    </div>
                </section>
            ))}
            {messageExist && <span className='message'>{message}</span>}
        </div>
    )
}

export default Dashboard