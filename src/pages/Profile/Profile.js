import styles from './Profile.module.css'
import { useFetchUser } from '../../hooks/useFetchUser'
import { useEffect, useState } from 'react'

// Router
import PersonalData from '../../components/PersonalData/PersonalData'
import Address from '../../components/Address/Address'

import AllProfessionalExperience from '../../components/AllProfessionalExperience/AllProfessionalExperience'
import ProfessionalExperience from '../../components/ProfessionalExperience/ProfessionalExperience'
import EditProfessionalExperience from '../../components/EditProfessionalExperience/EditProfessionalExperience'
import AcademicEducation from '../../components/AcademicEducation/AcademicEducation'
import AllAcademicEducation from '../../components/AllAcademicEducation/AllAcademicEducation'
import EditAcademicEducation from '../../components/EditAcademicEducation/EditAcademicEducation'
import PersonalDataCompany from '../../components/PersonalDataCompany/PersonalDataCompany'


const Profile = ({user}) => {

    const [stateMenu, setStateMenu] = useState('1')

    const [uid, setUID] = useState('')



    useEffect(() => {
        if(user) {
            setUID(user.uid)
        } else {
            setUID('')
        }
    }, [user, stateMenu])

    const {userDoc, loading} = useFetchUser('users', uid);

    const [eID, setEID] = useState('')

    const changeStateMenu = (e) => {
        if(e.target.id === '6' || e.target.id === '8') {
            setEID(e.target.nextElementSibling.id)
        }
        setStateMenu(e.target.id)
    }

    return (
        <div>
            {loading && <span className='loading'></span>}
            <div className={styles.sub_menu}>
                {/* personal data */}
                <button onClick={changeStateMenu} className={stateMenu === '1' ? styles.active : ''} id='1'>
                    <i className="fa-solid fa-book" id='1'></i>
                </button>
                {/* address */}
                <button onClick={changeStateMenu} className={stateMenu === '2' ? styles.active : ''} id='2'>
                    <i className="fa-solid fa-map" id='2'></i>
                </button>
                {userDoc && userDoc.idA === 0 && (
                    <>
                        {/* academic education */}
                        <button onClick={changeStateMenu} className={stateMenu === '3' || stateMenu === '7' || stateMenu === '8' ? styles.active : ''} id='3'>
                            <i className="fa-solid fa-graduation-cap" id='3'></i>
                        </button>
                        {/* professional experience */}
                        <button onClick={changeStateMenu} className={stateMenu === '4' || stateMenu === '5' || stateMenu === '6' ? styles.active : ''} id='4'>
                            <i className="fa-solid fa-user-tie" id='4'></i>
                        </button>
                    </>
                )}
            </div>

            <section className={styles.info}>
                {stateMenu === "1" && userDoc.idA === 0 && <PersonalData user={user} />}
                {stateMenu === "1" && userDoc.idA === 1 && <PersonalDataCompany user={user} />}
                {stateMenu === "2" && <Address user={user} />}
                {stateMenu === "3" && userDoc.idA === 0 && <AllAcademicEducation changeStateMenu={changeStateMenu} user={user} />}
                {stateMenu === "7" && userDoc.idA === 0 && <AcademicEducation changeStateMenu={changeStateMenu} user={user} />}
                {stateMenu === "8" && userDoc.idA === 0 && <EditAcademicEducation eID={eID} changeStateMenu={changeStateMenu} user={user} />}
                {stateMenu === "4" && userDoc.idA === 0 && <AllProfessionalExperience changeStateMenu={changeStateMenu} user={user} />}
                {stateMenu === "5" && userDoc.idA === 0 && <ProfessionalExperience changeStateMenu={changeStateMenu} user={user} />}
                {stateMenu === "6" && userDoc.idA === 0 && <EditProfessionalExperience eID={eID} changeStateMenu={changeStateMenu} user={user} />}
            </section>
        </div>
    )
}

export default Profile