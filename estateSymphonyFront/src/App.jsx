import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { ConnectionNavigateur } from './Navigation/ConnectionNavigateur'
import { AuthProvider } from './AuthContext/AuthContext'


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

  return (
    <ThemeProvider theme={themeLight}>
      <AuthProvider>
        <ConnectionNavigateur />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
