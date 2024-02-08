import { BrowserRouter as Router } from 'react-router-dom';
import RoutesDisplay from './utils/routes/routes';
import { AuthProvider } from './AuthContext/AuthContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesDisplay />
      </Router>
    </AuthProvider>
  );
}

export default App;
