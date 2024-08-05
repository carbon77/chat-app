import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider, AuthProviderProps} from 'react-oidc-context';
import {RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {router} from "./router";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const oidcConfig: AuthProviderProps = {
    authority: 'http://localhost:9080/realms/chat-app',
    client_id: 'react-frontend',
    redirect_uri: 'http://localhost:3000/',
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
