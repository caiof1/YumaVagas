import { useState } from "react";

export const useMessage = () => {
    const [messageExist, setMessageExist] = useState(false)

    const [message, setMessage] = useState('')

    const messageAtt = (message) => {
        setMessageExist(true)
        setMessage(message)
        setTimeout(() => {
            setMessageExist(false)
            setMessage('')
        }, 2000);
    }

    return {messageExist, message, messageAtt}
}