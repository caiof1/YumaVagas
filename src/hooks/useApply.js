import { useState } from 'react'
import {useUpdateUser} from './useUpdateUser'

export const useApply = () => {

    const {updateUser} = useUpdateUser('users')

    const {updateUser: updateDoc} = useUpdateUser('posts')

    const apply = (id, data, idPost, dataPost) => {
        try {
            // updating the user
            const idRefPost = idPost
            data.apply.push(idRefPost)
            updateUser(id, data)
            // updating the vacancy
            const idRef = id
            dataPost.apply.push(idRef)
            updateDoc(idPost, dataPost)
        } catch (error) {
            console.log(error)
        }
    }

    return apply

}