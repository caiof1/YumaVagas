import {db} from '../firebase/config'
import {updateDoc, doc} from 'firebase/firestore'

import {useState} from 'react'

export const useUpdateUser = (docCollection) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)



    const updateUser = async (id, data) => {
        setLoading(true)
        try {
            const docRef = await doc(db, docCollection, id)
            await updateDoc(docRef, data)
        } catch (error) {
            setError('Tivemos um erro ao salvar suas informações')
            console.log(error)
        }

        setLoading(false)

    }

    return {updateUser, loading, error}

}