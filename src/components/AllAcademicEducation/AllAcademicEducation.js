import styles from './AllAcademicEducation.module.css'

import { useFetchUser } from '../../hooks/useFetchUser'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useMessage } from '../../hooks/useMessage'

const AllAcademicEducation = ({user, changeStateMenu}) => {

  const {userDoc, id} = useFetchUser('users', user.uid)

  const {updateUser} = useUpdateUser('users')

  const {messageExist, message, messageAtt} = useMessage()

  let contador = -1

  const handleDeleteField = (e) => {
    userDoc.academic.splice(e.target.id, 1)
    updateUser(id, userDoc)
    messageAtt('Formação excluída')
  }

  return (
    <div className={styles.container}>
      {userDoc.academic && userDoc.academic.map((value) => (
        contador += 1,
        <div key={contador} className={styles.container_academic}>
          <div className={styles.icons}>
            <i id='8' onClick={changeStateMenu} className="fa-solid fa-pen"></i>
            <i id={contador} onClick={handleDeleteField} className="fa-sharp fa-solid fa-trash"></i>
          </div>
          <h2>{value.nameInstitution}</h2>
          <span>{value.curse}</span>
          <span>{value.shift}</span>
          <span>{value.situation}</span>
          <span>
            <span>{value.dateInitial} - </span>
            <span>{userDoc && value.dateFinal === '' ? 'Até o momento' : value.dateFinal}</span>
          </span>
        </div>
      ))}
      {userDoc.academic && userDoc.academic.length === 0 && (
        <span className={styles.noexperience}>Nenhuma formação declarada...</span>
      )}
      <button className='btn' id='7' onClick={changeStateMenu}>Adicionar formação</button>
      {messageExist && <span className='message'>{message}</span>}
    </div>
  )
}

export default AllAcademicEducation