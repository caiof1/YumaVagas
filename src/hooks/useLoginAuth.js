import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { useRegisterAuth } from "./useRegisterAuth";

export const useLoginAuth = () => {

    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)

    const {auth} = useRegisterAuth()
    
    const login = async (user) => {

        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, user.email, user.password)
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado';
            } else if(error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage = 'Ocorreu um erro';
            }

            setError(systemErrorMessage)
        }

        setLoading(false)

    }


    return {login, error, loading}

}