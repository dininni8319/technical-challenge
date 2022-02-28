import { createContext } from 'react';

export const ConfigContext = createContext()

export function ConfigProvider(props) {

    const github_secrets = {
       client_id: process.env.REACT_APP_CLIENT_ID,
       client_secret: process.env.REACT_APP_CLIENT_SECRET,
       url: process.env.REACT_APP_URL
    }

    return (
        <ConfigContext.Provider value={{ github_secrets }}>
            {props.children}
        </ConfigContext.Provider>
    )

    
}