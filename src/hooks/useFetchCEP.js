import { useState } from "react"

export const useFetchCEP = () => {

    const url = 'https://cdn.apicep.com/file/apicep/'

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const searchCEP = async (cepAdjusting) => {

        setLoading(true)
        // search the zip
        try {
            const data = await fetch(`${url}${cepAdjusting}.json`)
            const res = await data.json()
            setLoading(false)
            return res
        } catch (error) {
            setError(error)
        }

        setLoading(false)
        
    }

    return {searchCEP, loading, error}

}