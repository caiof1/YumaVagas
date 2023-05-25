import { useState } from 'react'
import styles from './SearchFunctionality.module.css'
import { useNavigate } from 'react-router-dom'

const SearchFunctionality = () => {

    const [query, setQuery] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if(query) {
          return navigate(`/search?q=${query}`);
        }
    }

    return (
        <form autoComplete='off' className={styles.container} onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder='Pesquise uma vaga' value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
    )
}

export default SearchFunctionality