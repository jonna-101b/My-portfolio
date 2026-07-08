import { useState, createContext } from 'react';
import useQualificationsReducer from '../../../../Hooks/useQualificationsReducer';



export const QualificationsDisplayContext = createContext();

export function QualificationsDisplayContextProvider({ children }) {
        const { state } = useQualificationsReducer();
        const [ qualifications, setQualifications ] = useState(state.qualifications);

        return (
                <QualificationsDisplayContext.Provider value={{ qualifications, setQualifications }}>
                        { children }
                </QualificationsDisplayContext.Provider>
        );
}