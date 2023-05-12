import { useState } from "react"

export const useFetchCEP = () => {

    const url = 'https://cdn.apicep.com/file/apicep/'

    const [loading, setLoading] = useState(false)

    const searchCEP = async (cepAdjusting) => {

        setLoading(true)
        // search the zip
        try {
            const data = await fetch(`${url}${cepAdjusting}.json`)
            const res = await data.json()
            setLoading(false)
            return res
        } catch (error) {
            console.log(error)    
        }

        setLoading(false)
        
    }

    return {searchCEP, loading}

}