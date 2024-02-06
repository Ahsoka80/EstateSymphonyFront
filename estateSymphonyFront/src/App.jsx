import { Switch } from '@mui/material';
import { AuthProvider } from './AuthContext/AuthContext';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './Components/Login'
import SignupForm from './Form/SignupForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <LoginForm>
            <h1>Formulaire de Connexion</h1>
          </LoginForm>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;