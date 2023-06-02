import styles from './DashboardCompany.module.css'

import { useFetchUser } from '../../hooks/useFetchUser'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useEffect, useState } from 'react'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { Link, useNavigate } from 'react-router-dom'
import { useMessage } from '../../hooks/useMessage'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = ({user}) => {

    const {userDoc, id} = useFetchUser('users', user && user.uid)

    const [document, setDocument] = useState([])

    const navigate = useNavigate()
    
    const {documents} = useFetchDocuments('posts')

    const {documents: users} = useFetchDocuments('users')

    const {updateUser} = useUpdateUser('users')

    const deleteDocument = useDeleteDocument('posts')

    const [update, setUpdate] = useState(false)

    const {messageExist, message, messageAtt} = useMessage()

    useEffect(() => {
        setUpdate(false)
        setDocument([])
        if(documents) {
            documents.map((doc) => {
                if(doc.uid === userDoc.uid) {
                    setDocument((actualDocument) => [
                        ...actualDocument,
                        doc  
                    ])
                }
            })
            
        }

    }, [userDoc, documents, update])

    const handleDeleteApply = (idPost) => {
        users.map((use) => {
            use.apply.splice(idPost, 1)
            updateUser(use.id, use)
        })

        deleteDocument(idPost)

        setUpdate(true)
        messageAtt('Candidatura excluída')
    }

    return (
        <div className={styles.container_dashboard}>
            {userDoc && document.length === 0 && (
                <>
                    <p className='noposts'>Você não criou nenhuma vaga</p>
                    <Link to="/create/posts">
                        <button className='btn_outline'>Criar vaga</button>
                    </Link>
                </>
            )}
            {userDoc && documents && document && document.map((doc) => (
                <section key={doc.id} className={doc.statusPost === 'Fim' && styles.end_vacancy}>
                    <section>
                        <div>
                            <span>{doc.name}</span>
                        </div>
                        <div>
                            <span>{doc.statusPost}</span>
                        </div>
                    </section>
                    <div>
                        <button className='btn_outline' onClick={() => navigate(`/dashboard/company/view`)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button onClick={() => navigate(`/dashboard/company/edit_vacancy/${doc.id}`)} className='btn_outline' >
                            <i class="fa-solid fa-file-pen"></i>
                        </button>
                        <button onClick={() => handleDeleteApply(doc.id)} className='btn_outline'>X</button>
                    </div>
                </section>
                ))}
            {messageExist && <span className='message'>{message}</span>}
        </div>
    )
}

export default Dashboard