import {useState, useEffect} from 'react'

import {useProvider} from '../context/UserContext'

import { useFetchUser } from './useFetchUser'

export const useUserData = (user) => {
    const [uid, setUID] = useState('')

    useEffect(() => {
        if(user) {
            setUID(user.uid)
        } else {
            setUID('')
        }
    }, [user])

    const {userDoc, id} = useFetchUser('users', uid)



    return {userDoc, id}
}