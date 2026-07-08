import { useState, createContext } from 'react';


export const NotifyContext = createContext();

export function NotifyContextProvider({ children }) {
        const [action, setAction] = useState({});

        return (
                <NotifyContext.Provider value={{ action, setAction }}>
                        { children }
                </NotifyContext.Provider>
        )
}