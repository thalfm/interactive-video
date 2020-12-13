import React from 'react';
import StoreContext from './StoreContext'
import useStorage from '../../services/auth';


const StoreProvider = (props: any) => {
    const {token, setToken} = useStorage();

    return (
        <StoreContext.Provider
            value={{
                token,
                setToken
            }}
        >
            {props.children}
        </StoreContext.Provider>
    ) 
}

export default StoreProvider;