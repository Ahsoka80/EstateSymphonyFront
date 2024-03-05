import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import Header from './Componants/Header/Header'
import Main from './Componants/Main/Main'
import Accueil from './Componants/Accueil/Accueil'
import { ConnectionNavigateur } from './Navigation/ConnectionNavigateur'


const themeLight = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff' 
    },
    primary: {
      main: '#ffea00',
      contrastText:'rgba(0,0,0,0.87)'
            
    },
    secondary: {
      main: '#52b202',
    }
  },
});


function App() {

  return (
    <ThemeProvider theme={themeLight}>
      <ConnectionNavigateur />
    </ThemeProvider>
  )
}

export default App;
