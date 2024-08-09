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
import {StompSessionProvider} from 'react-stomp-hooks';
import {getUser} from "./apiClient";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

root.render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={darkTheme}>
            <StompSessionProvider url={"http://localhost:8081/api/chat"} connectHeaders={{
                Authorization: `Bearer ${getUser()?.access_token}`,
                myheader: 'hello'
            }} beforeConnect={() => console.log("connect")}>
                <StoreProvider store={store}>
                    <AuthProvider {...oidcConfig}>
                        <RouterProvider router={router}/>
                    </AuthProvider>
                </StoreProvider>
            </StompSessionProvider>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
