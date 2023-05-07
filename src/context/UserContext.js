import { useContext, createContext } from "react";

const UserContext = createContext()

export const UserContextProvider = ({children, value}) => {
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}


export const useProvider = () => {
    return useContext(UserContext)
}