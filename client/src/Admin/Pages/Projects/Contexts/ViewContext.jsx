import { useState, createContext } from 'react';


export const ViewContext = createContext();

export function ViewContextProvider({ children }) {
        const [view, setView] = useState({});

        return (
                <ViewContext.Provider value={{ view, setView }}>
                        { children }
                </ViewContext.Provider>
        )
}