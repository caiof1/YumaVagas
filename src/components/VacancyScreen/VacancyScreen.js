import { Link, useNavigate } from "react-router-dom"
import styles from './VacancyScreen.module.css'

import { useApply } from "../../hooks/useApply"
import { useFetchUser } from "../../hooks/useFetchUser"
import { useMessage } from "../../hooks/useMessage"

const VacancyScreen = ({error, documents, user, message}) => {

    const apply = useApply()

    const {messageExist, message: messageSucess, messageAtt} = useMessage()

    const {userDoc, id} = useFetchUser('users', user && user.uid)

    const navigate = useNavigate()

    const sendApply = (doc) => {
        if(user && userDoc.apply) {
            messageAtt('Candidatura enviada') 
            apply(id, userDoc, doc.id, doc)
        }
    }

    return (
        <div className={styles.container}>
            {error && <span>{error}</span>}
                {documents && documents.length === 0 && (
                    <section className={styles.vaga_create}>
                        <p>{message}</p>
                        {user && userDoc.idA === 1 && (
                            <Link to="/create/posts">
                                <button className='btn'>Criar vaga</button>
                            </Link>
                        )}
                    </section>
                )}
                {documents && documents.map((doc) => (
                    <div onClick={() => navigate(`/detail_vacancy/${doc.id}`)} key={doc.id}>
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
                        <p className={styles.description}>{doc.description.substr(0, 330)}{doc.description.length > 329 ? '...' : ''}</p>
                        <Link to={!user && '/login'}>
                            {user && userDoc && userDoc.apply.find(element => element === doc.id) !== undefined ? (
                                <button className='btn btn-disabled' disabled>Candidatura enviada</button>
                            ) : (
                                <button className='btn' onClick={() => sendApply(doc)}>Quero me candidatar</button>
                            )}
                        </Link>
                    </div>
                ))}
                {messageExist && <span className="message">{messageSucess}</span>}
        </div>
    )
}

export default VacancyScreen