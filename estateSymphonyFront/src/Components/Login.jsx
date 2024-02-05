import { TextFields } from "@mui/icons-material";
import { useState } from "react";
import Button from '@mui/material/Button';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Identifiant : ', username);
        console.log('Mot de passe : ', password);
    };
    return (
        <div>
            <TextFields
                label="Identifiant"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextFields
                label="Mot de passe"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
            >
                Connexion
            </Button>
        </div>
    )
}