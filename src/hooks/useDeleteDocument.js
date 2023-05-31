import {deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useDeleteDocument = (docCollection) => {
    const deleteDocument = async (id) => {
        try {
            const docRef = await doc(db, docCollection, id)
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error)
        }
    }

    return deleteDocument
}