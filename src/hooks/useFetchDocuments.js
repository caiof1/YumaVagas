import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query, 
    orderBy, 
    onSnapshot, 
    where,
    QuerySnapshot
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            if(cancelled) return

            setLoading(true)

            const collectionRef = collection(db, docCollection)
    
            try {
                
                let q = await query(collectionRef, orderBy('createAt', 'desc'));
    
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                })
            } catch (error) {
                setError('Tivemos um erro com o banco de dados!')
            }

            setLoading(false)
        }

        loadData()
    }, [docCollection, documents])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {documents, loading, error}
}