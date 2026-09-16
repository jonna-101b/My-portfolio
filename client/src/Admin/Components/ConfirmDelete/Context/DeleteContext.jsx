import { createContext, useState, useCallback } from 'react';

export const DeleteContext = createContext();

export function DeleteContextProvider({ children }) {
        const [deleteTarget, setDeleteTarget] = useState(null);

        const openDeleteModal = useCallback((target) => {
                setDeleteTarget(target);
        }, []);

        const closeDeleteModal = useCallback(() => {
                setDeleteTarget(null);
        }, []);

        return (
                <DeleteContext.Provider value={{ deleteTarget, setDeleteTarget, openDeleteModal, closeDeleteModal }}>
                        {children}
                </DeleteContext.Provider>
        );
}
