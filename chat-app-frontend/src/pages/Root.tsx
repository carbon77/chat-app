import {Box, CssBaseline} from "@mui/material";
import {MyAppBar} from "../components/MyAppBar";
import {Outlet} from "react-router-dom";
import React from 'react'

export const Root = () => {
    return (
        <div>
            <CssBaseline/>
            <MyAppBar/>

            <Box sx={{
                mt: '80px',
                px: '20%',
            }}>
                <Outlet/>
            </Box>
        </div>
    );
};