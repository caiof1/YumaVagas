import { useState} from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";


export const useInsertPost = (docCollection) => {

    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)


    const insertPost = async (infoVacancy) => {

        setLoading(true)

        try {
            const newDocument = {...infoVacancy, createAt: Timestamp.now()}

            await addDoc(
                collection(db, docCollection),
                newDocument
            )


        } catch (error) {
            setError('Tivemos um problema ao publicar sua vaga!')

            console.log(error)
        }

        setLoading(false)

    }

    return {insertPost, error, loading}
}