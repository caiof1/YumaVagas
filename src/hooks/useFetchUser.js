import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc
} from 'firebase/firestore';


export const useFetchUser = (docCollection, uid) => {

    const [userDoc, setUserDoc] = useState('')
    const [id, setID] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            
            setLoading(true)

            try {
                
                const q = query(collection(db, docCollection), where('uid', '==', uid));

                const querySnapshot = await getDocs(q)

                setID(querySnapshot.docs[0].id)

                const docRef = await doc(db, docCollection, querySnapshot.docs[0].id)

                const docGet = await getDoc(docRef)

                setUserDoc(docGet.data())
               
            } catch (error) {
                setError('Tivemos um erro ao puxar suas informações')
            }
            setLoading(false)
        }

        fetchUser()
    }, [docCollection, uid])

    return {userDoc, id, loading, error}

}