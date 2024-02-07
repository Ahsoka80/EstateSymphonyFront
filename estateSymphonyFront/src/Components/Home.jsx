import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
        console.log('Utilisateur déconnecté');
    };
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    return (
        <div>
            {isLoggedIn ?
                (<button onClick={handleLogout} color="error">Se déconnecter</button>)
                :
                (<>
                    <button onClick={handleLogin} color="primary">Se connecter</button>
                    <button onClick={handleRegister} color="secondary">Inscription</button>
                </>
                )
            }
        </div>
    );
};
export default HomePage