import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { ConnectionNavigateur } from './Navigation/ConnectionNavigateur'
import { AuthProvider } from './AuthContext/AuthContext'
import { useEffect, useState } from 'react';
import { getProperties } from './utils/api/properties';
import PropertiesContext from './context/propertieContext';


const themeLight = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    primary: {
      main: '#ffea00',
      contrastText: 'rgba(0,0,0,0.87)'

    },
    secondary: {
      main: '#52b202',
    }
  },
});


function App() {

  const [properties, setProperties]= useState([ ])
  useEffect(() => {
    getProperties()
            .then(dataa => {
                setProperties(dataa.slice(-4)) // La fonction .slice() permet de d'afficher les dernières élément de la tableau dataa.
            })
  }, [])

  return (
    <ThemeProvider theme={themeLight}>
      <AuthProvider>
        <PropertiesContext.Provider value={{properties: properties}}>
        <ConnectionNavigateur />
        </PropertiesContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
