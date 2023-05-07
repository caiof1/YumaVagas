import styles from './Profile.module.css'
import { useFetchUser } from '../../hooks/useFetchUser'
import { useEffect } from 'react'



const Profile = ({user}) => {

    useEffect(() => {
        if(!user) {
            return;
        }
    }, [user])

    const {userDoc, loading, error} = useFetchUser('users', user.uid);

    console.log(userDoc)

    return (
        <div>
            {loading && <span className='loading'></span>}
        </div>
    )
}

export default Profile