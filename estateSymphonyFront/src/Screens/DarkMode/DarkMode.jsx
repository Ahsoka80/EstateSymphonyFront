import { createTheme } from '@mui/material'
import React from 'react'

export const DarkMode = createTheme ({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#121212' 
        },
        primary: {
            main: '#121212',
            contrastText:'#FFFFFF'
        },
    },
    
    
});
