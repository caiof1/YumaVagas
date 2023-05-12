import styles from './Profile.module.css'
import { useFetchUser } from '../../hooks/useFetchUser'
import { useEffect, useState } from 'react'

// Router
import PersonalData from '../../components/PersonalData/PersonalData'
import Address from '../../components/Address/Address'


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

    const {userDoc, loading, error} = useFetchUser('users', uid);

    const changeStateMenu = (e) => {
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
                {/* academic information */}
                <button onClick={changeStateMenu} className={stateMenu === '3' ? styles.active : ''} id='3'>
                    <i className="fa-solid fa-graduation-cap" id='3'></i>
                </button>
                {/* professional experience */}
                <button onClick={changeStateMenu} className={stateMenu === '4' ? styles.active : ''} id='4'>
                    <i className="fa-solid fa-user-tie" id='4'></i>
                </button>
            </div>

            <section className={styles.info}>
                {stateMenu === "1" && <PersonalData user={user} />}
                {stateMenu === "2" && <Address user={user} />}
            </section>
        </div>
    )
}

export default Profile