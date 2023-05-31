import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import styles from './DetailVacancy.module.css'
import { useFetchUser } from '../../hooks/useFetchUser'

const DetailVacancy = ({user}) => {

    const {id} = useParams()

    const {document, error} = useFetchDocument('posts', id)
    const {userDoc} = useFetchUser('users', document && document.uid)
    const {userDoc: userInfo} = useFetchUser('users', user && user.uid)

    return (
        <div className={styles.container}>
            <section className={styles.container_all}>
                <div className={styles.container_vacancy}>
                    <div className={styles.info_vacancy}>
                        <h2>{document.name}</h2>
                        <div>
                            <span>{document.model} / </span>
                            <span>{document.type}</span>
                        </div>
                        <span>Salário:
                            <span> {document.wage}</span>
                        </span>
                        <div>
                            <span className={styles.qtd_vacancy}>{document.qtd} {document.qtd > 0 ? 'Vagas' : 'Vaga'}: </span>
                            <span>{document.city} - {document.state}</span>
                        </div>
                        <p>{document.description}</p>
                    </div>
                    <hr />
                    <div className={styles.benefits}>
                        <h3>Benefícios:</h3>
                        <ul>
                            {document && document.benefits.length === 0 && <span className="noposts">Nenhum benefício informado!</span>}
                            {document && document.benefits.map((benef) => (
                                <li key={benef.idBenefit}>
                                    <span>{benef.nameBenefits}{benef.valueBenefits ? ' - ' + benef.valueBenefits : ''}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div className={styles.info_company}>
                        <h3>Dados da Empresa:</h3>
                        <div className={styles.img_info}>
                            <i className="fa-regular fa-building"></i>
                            <div>
                                <h4>{document.createBy}</h4>
                                <span>Funcionários:
                                    <span> {userDoc && userDoc.qtdStaff > 0 ? userDoc.qtdStaff : '0'}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.apply_container}>
                <p>Se candidate aqui :D</p>
                {user && userInfo && document && document.apply.find(element => element === userInfo.id) !== undefined ? (
                    <button className='btn btn-disabled' disabled>Candidatura enviada</button>
                ) : (
                    <button className={styles.btn}>Candidatar</button>
                )}
            </section>
            {error && <span className="error">{error}</span>}
        </div>
    )
}

export default DetailVacancy