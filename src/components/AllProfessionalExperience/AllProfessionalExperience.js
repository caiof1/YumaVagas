import styles from './AllProfessionalExperience.module.css'

import { useFetchUser } from '../../hooks/useFetchUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useMessage } from '../../hooks/useMessage'

const AllProfessionalExperience = ({user, changeStateMenu}) => {

  const {userDoc, id} = useFetchUser('users', user.uid)

  const {updateUser} = useUpdateUser('users')

  const {messageExist, message, messageAtt} = useMessage()

  let contador = -1

  const handleDeleteField = (e) => {
    userDoc.profissional.splice(e.target.id, 1)
    updateUser(id, userDoc)
    messageAtt('Experiência excluída')
  }

  return (
    <div className={styles.container}>
      {userDoc.profissional && userDoc.profissional.map((value) => (
        contador += 1,
        <div key={contador} className={styles.container_profissional}>
          <div className={styles.icons}>
            <i id='6' onClick={changeStateMenu} className="fa-solid fa-pen"></i>
            <i id={contador} onClick={handleDeleteField} className="fa-sharp fa-solid fa-trash"></i>
          </div>
          <h2>{value.nameCompany}</h2>
          <span>{value.charge}</span>
          <span>{value.functionCompany}</span>
          <span>{value.assignments.substring(0, 300)}{value.assignments.length > 299 ? '...' : ''}</span>
          <span>
            <span>{value.dateInitial} - </span>
            <span>{userDoc && value.dateFinal === '' ? 'Até o momento' : value.dateFinal}</span>
          </span>
        </div>
      ))}
      {userDoc.profissional && userDoc.profissional.length === 0 && (
        <span className={styles.noexperience}>Nenhuma experiência declarada...</span>
      )}
      <button className='btn' id='5' onClick={changeStateMenu}>Adicionar experiência</button>
      {messageExist && <span className='message'>{message}</span>}
    </div>
  )
}

export default AllProfessionalExperience