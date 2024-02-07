import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/Register';
import LoginForm from './Components/Login';
import HomePage from './Components/Home';
import { AuthProvider } from './AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
