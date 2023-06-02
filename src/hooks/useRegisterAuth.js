import {db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'


import { useState } from 'react'

import { useInsertUser } from './useInsertUser'

export const useRegisterAuth = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    const {createInfoUser} = useInsertUser('users')

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
                email: auth.currentUser.proactiveRefresh.user.email,
                name: auth.currentUser.proactiveRefresh.user.displayName,
                idA: data.idA,
                apply: [],
                number: '',
                gen: '',
                state: '',
                portfolio: '',
                linkedin: '',
                cep: '',
                stateCEP: '',
                city: '',
                neighborhood: '',
                road: '',
                numberCEP: '',
                profissional: [],
                academic: [],
                qtdStaff: '',
                carry: '',
                emailContact: ''
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
 
    return {auth, createUser, error, loading, logout, db}
    
}