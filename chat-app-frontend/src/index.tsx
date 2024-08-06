import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from 'react-oidc-context';
import {RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {router} from "./router";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import oidcConfig from './oidcConfig';
import {Provider as StoreProvider} from "react-redux";
import store from "./store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <AuthProvider {...oidcConfig}>
                <RouterProvider router={router}/>
            </AuthProvider>
        </StoreProvider>
    </React.StrictMode>
);

reportWebVitals();
