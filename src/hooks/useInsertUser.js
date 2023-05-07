import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";

export const useInsertUser = (docCollection) => {


    const createInfoUser = async (infoUser) => {

        const newUser = {...infoUser, createAt: Timestamp.now()}

        try {

            await addDoc(
                collection(db, docCollection),
                newUser
             )

             console.log('funfou')

        } catch (error) {
            console.log(error)
        }

    }

    return {createInfoUser}

}