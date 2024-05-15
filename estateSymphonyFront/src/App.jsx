import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { ConnectionNavigateur } from './Navigation/ConnectionNavigateur'
import { AuthProvider } from './AuthContext/AuthContext'
import { useEffect, useState } from 'react';
import { getAllProperties } from './utils/api/properties';
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

  const [properties, setProperties] = useState([])

  const fetchAllProperties = async () => {
    const data = await getAllProperties();
    setProperties(data);
    console.log('Actualisation des propriétés du context');
  }
  useEffect(() => {
    fetchAllProperties();
  }, [])

  return (
    <ThemeProvider theme={themeLight}>
      <AuthProvider>
        <PropertiesContext.Provider value={{ properties, fetchAllProperties }}>
          <ConnectionNavigateur />
        </PropertiesContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  )
}


export default App;
