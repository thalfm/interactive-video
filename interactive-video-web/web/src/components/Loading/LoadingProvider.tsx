import React, { useState, useMemo, useEffect } from 'react';
import LoadingContext from './LoadingContext'
import api from '../../services/api';
// @ts-ignore
import {omit} from 'lodash'

const LoadingProvider = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [countRequest, setCountRequest] = useState(0)
    
    useMemo(() => {
        let isSubscribed = true;

        api.interceptors.request.use(async config => {
            if (isSubscribed && !config.headers.hasOwnProperty('ignoreLoader')) {
                setLoading(true);
                setCountRequest((prevCountRequest => prevCountRequest + 1));
            }

            config.headers = omit(config.headers, 'ignoreLoader')

            return config;
        });

        api.interceptors.response.use(
            async response => {
                if (isSubscribed) {
                    decrementCountRequest();
                }
                return response;
            },
            async error => {
                if (isSubscribed) {
                    decrementCountRequest();
                }
                return Promise.reject(error);
            }
        );
        return () => isSubscribed = false;
    }, [true])

    useEffect(() => {
        if (countRequest <= 0) {
            setLoading(false);
        }
    }, [countRequest])

    function decrementCountRequest() {
        setCountRequest((prevCountRequest => prevCountRequest - 1));
    }

    return (
        <LoadingContext.Provider value={loading}>
            {props.children}
        </LoadingContext.Provider>
    ) 
}

export default LoadingProvider;