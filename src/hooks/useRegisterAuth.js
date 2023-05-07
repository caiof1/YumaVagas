import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'


import { useState } from 'react'

import { useInsertUser } from './useInsertUser'

import { useProvider } from '../context/UserContext'



export const useRegisterAuth = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    const {createInfoUser} = useInsertUser('users')

    const infoAuth = useProvider();

    const createUser = async (data) => {
        setError(null);

        setLoading(true);

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })

            createInfoUser({
                uid: auth.currentUser.proactiveRefresh.user.uid,
                idA: data.idA
            })

            setLoading(false);

            return user


        } catch (error) {


            let messageError
            console.log(error.message)
            
            if(error.message.includes('password')) {
                messageError = 'Senha deve conter no minimo 6 digitos'
            } else if(error.message.includes('email-already')) {
                messageError = 'E-mail já cadastrado'
            } else {
                messageError = 'Tivemos algum problema no cadastro'
            }

            setError(messageError);
        }

        setLoading(false);
    }


    const logout = () => {
        signOut(auth)
    }
 
    return {auth, createUser, error, loading, logout}
    
}