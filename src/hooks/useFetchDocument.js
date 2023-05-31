import { useEffect, useState } from "react"
import {getDoc, doc} from 'firebase/firestore'
import { db } from "../firebase/config"

export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDocument = async() => {
            try {
                const fetchDoc = await getDoc(doc(db, docCollection, id))
                setDocument(fetchDoc.data())
            } catch (error) {   
                setError('Tivemos um error com o banco')
            }
        }
        fetchDocument()
    }, [docCollection, id])

    return {document, error}
}