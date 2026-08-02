import { useState, createContext } from 'react';


export const LayoutContext = createContext();

export function LayoutContextProvider({ children }) {
        const [layout, setLayout] = useState(true);

        return (
                <LayoutContext.Provider value={{ layout, setLayout }}>
                        { children }
                </LayoutContext.Provider>
        )
}