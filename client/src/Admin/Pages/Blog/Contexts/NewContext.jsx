import { useState, createContext } from 'react';


export const NewContext = createContext();

export function NewContextProvider({ children }) {
        const [New, setNew] = useState({});

        return (
                <NewContext.Provider value={{ New, setNew }}>
                        { children }
                </NewContext.Provider>
        )
}