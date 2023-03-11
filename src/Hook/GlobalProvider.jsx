import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [showCreateMemeModal, setShowCreateMemeModal] = useState(false);
    const [suiPrice, setSuiPrice] = useState(0);
    const [reloadThread, setReloadThread] = useState(false);
    const [newMeme, setNewMeme] = useState();
    const [newTrade, setNewTrade] = useState();

    return (
        <GlobalContext.Provider value={{ 
            showCreateMemeModal, 
            setShowCreateMemeModal,
            reloadThread,
            setReloadThread,
            newMeme,
            setNewMeme,
            newTrade,
            setNewTrade
         }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};