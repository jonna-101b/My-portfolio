import { useState, createContext } from 'react';


export const EditContext = createContext();

export function EditContextProvider({ children }) {
        const [edit, setEdit] = useState({});

        return (
                <EditContext.Provider value={{ edit, setEdit }}>
                        { children }
                </EditContext.Provider>
        )
}