import { useEffect, useState } from 'react';
import styles from './Posts.module.css';

import {useInsertPost} from '../../hooks/useInsertPost'

import { useProvider } from '../../context/UserContext';

import { useNavigate } from 'react-router-dom';

const Posts = () => {

    const {user} = useProvider()

    const navigate = useNavigate()

    const {insertPost, error: insertError, loading} = useInsertPost('posts')

    const [error, setError] = useState(null)

    const [active, setActive] = useState(false)

    const [activeSecond, setActiveSecond] = useState(false)

    const [name, setName] = useState('')
    const [qtd, setQtd] = useState('')
    const [wage, setWage] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [description, setdescription] = useState('')
    const [type, setType] = useState('')
    const [model, setModel] = useState('')
    const [nameBenefits, setNameBenefits] = useState('')
    const [valueBenefits, setValueBenefits] = useState('')
    const [allBenefits, setAllBenefits] = useState([])
    const [idBenefit, setIdBenefit] = useState(0)

    const handleIconRotate = () => {
        if(active === false) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    const handleIconRotateSecond = () => {
        if(activeSecond === false) {
            setActiveSecond(true)
        } else {
            setActiveSecond(false)
        }
    }


    const handleAddBenefit = () => {
        if(!nameBenefits) return

        setIdBenefit((actualIdBenefit) => actualIdBenefit + 1)

        const arrayBenefit = {nameBenefits, valueBenefits, idBenefit}
    
        setAllBenefits((actualAllBenefits) => [
            ...actualAllBenefits,
            arrayBenefit
        ])

        setNameBenefits('')
        setValueBenefits('')
        
    }

    const handleRemoveBenefit = (e) => {
        setAllBenefits((actualAllBenefits) => actualAllBenefits.splice(e.target.value, 1))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError(null)

        if(!type || !model) {
            setError('Esqueceu de preencher o tipo ou modelo de trabalho')
            return;
        }


        insertPost({
            name,
            qtd,
            wage,
            state,
            city,
            description,
            type,
            model,
            benefits: allBenefits,
            statusPost: 'Candidaturas',
            apply: [],
            uid: user.uid,
            createBy: user.displayName
        })

        navigate('/')
        
    }
    
    useEffect(() => {
        if(insertError) {
            setError(insertError)
        }
    }, [insertError])

    return (
        <div className={styles.container}>
            <form autoComplete='off' onSubmit={handleSubmit} className={styles.form}>
                <h2>Preencha tudo para postar a sua vaga!</h2>
                <label>
                    <span>Nome da vaga:</span>
                    <input type="text" name="nameVacancy" value={name} required onChange={(e) => setName(e.target.value)} placeholder='Digite o nome da vaga' />
                </label>
                <label>
                    <span>Qtd Vagas:</span>
                    <input type="number" name="qtdVacancy" value={qtd} required onChange={(e) => setQtd(e.target.value)} placeholder='Quantas vagas estão abertas?' />
                </label>
                <label>
                    <span>Salário:</span>
                    <input type="number" name="wageVacancy" value={wage} onChange={(e) => setWage(e.target.value)} placeholder='Qual o salário?' />
                    <span>*Deixe vazio caso queira combinar com o candidato*</span>
                </label>
                <label>
                    <span>Estado:</span>
                    <input type="text" name="stateVacancy" value={state} required onChange={(e) => setState(e.target.value)} placeholder='Digite o estado da vaga' />
                </label>
                <label>
                    <span>Cidade:</span>
                    <input type="text" name="cityVacancy" value={city} required onChange={(e) => setCity(e.target.value)} placeholder='Digite a cidade da vaga' />
                </label>
                <label>
                    <span>Descrição da vaga:</span>
                    <textarea name="descriptionVacancy" value={description} required onChange={(e) => setdescription(e.target.value)} placeholder='Descrição da vaga'></textarea>
                    <span>*Não adicione links externos para outra vaga ou a mesma vaga em outro site!*</span>
                </label>
                <label className={styles.select}>
                    <span>Tipo da vaga</span>
                    <select name="typeVacancy" id='modelVacancy' value={type} onChange={(e) => setType(e.target.value)} className={active ? styles.active : ''} onClick={handleIconRotate}>
                        <option value='' selected disabled>- - - Selecione o tipo do contrato - - -</option>
                        <option value="Estágio">Estágio</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Temporário">Temporário</option>
                        <option value="Jovem aprendiz">Jovem aprendiz</option>
                    </select>
                    <i className="fa-solid fa-sort-down"></i>
                </label>
                <label className={styles.select}>
                    <span>Qual o modelo de trabalho: </span>
                    <select name="modelVacancy" id='modelVacancy' value={model} onChange={(e) => setModel(e.target.value)} className={activeSecond ? styles.active : ''} onClick={handleIconRotateSecond}>
                        <option value='' selected disabled>- - - Selecione o modelo de trabalho - - -</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Hibrido">Hibrido</option>
                    </select>
                    <i className="fa-solid fa-sort-down"></i>
                </label>
                <label className={styles.benefits}>
                    <span>Benefícios</span>
                    <div>
                        <input type="text" name='nameBenefits' placeholder='Qual é o benefício?' value={nameBenefits} onChange={(e) => setNameBenefits(e.target.value)} />
                        <input type="number" name="valueBenefits" placeholder='Digite o valor do benefício' value={valueBenefits} onChange={(e) => setValueBenefits(e.target.value)} />
                    </div>
                    <input type="button" onClick={handleAddBenefit} className={styles.btn} value="Adicionar benefício" />
                    <section className={styles.container_benefits}>
                        <ul className={styles.benefit}>
                            {allBenefits && allBenefits.map((ben) => (
                                <li key={ben.idBenefit}>
                                    <span>{ben.nameBenefits}{ben.valueBenefits !== '' ? ' - ' + ben.valueBenefits : ''}</span>
                                    <span id={ben[2]} onClick={handleRemoveBenefit}>x</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </label>
                {error && <p>{error}</p>}
                <button type="submit" className='btn'>
                    {loading ? <span className='loading'></span> : 'Cadastrar vaga'}
                </button>
            </form>
        </div>
    )
}

export default Posts