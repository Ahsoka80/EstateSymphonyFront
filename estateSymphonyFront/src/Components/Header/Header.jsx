/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css"
import CustomButton from '../Buttons/CustomButton';
import Link from '@mui/material/Link';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../../utils/api/useEmail';
import { getUserEmail } from '../../utils/api/user';
import { AuthContext } from '../../AuthContext/AuthContext';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = (props) => {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userFirstname, setUserFirstname] = useState(' ');
    const [userLastname, setUserLastname] = useState(' ');
    const [userIdRoles, setUserIdRoles] = useState(10);
    const email = useEmail();
    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setUserFirstname(data.firstname);
                setUserLastname(data.lastname);
                setUserIdRoles(data.idRoles);
            })
            console.log('Utilisateur connecté');
        } else {
            console.log('Utilisateur déconnecté');
        }
    }, [isLoggedIn, email, userFirstname, userLastname, userIdRoles])
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
        navigate('/');
    };
    const handleLogin = () => {
        navigate('/login');
    }
    const handleHome = () => {
        navigate('/');
    }
    const handleProfil = () => {
        navigate('/profil');
    }
    const handleDashboard = () => {
        navigate('/dashboard')
    }

    const {
        title,
        textColor
    } = props;

    return (
        <header className='header'>
            <Navbar>
                <Container className='containerMenu'>
                    <Navbar.Brand style={{ color: textColor }} onClick={handleHome}                    >
                        <Link style={{ textDecoration: 'none', padding: '0px 10px' }} sx={{ cursor: 'pointer' }}>
                            {title}
                        </Link>
                    </Navbar.Brand>
                    <Container>
                        <Link to='/accueil' style={{ textDecoration: 'none', color: 'white', padding: '0px 10px' }}>
                            Accueil
                        </Link>
                        <Link to='/acheter' style={{ textDecoration: 'none', color: 'white', padding: '0px 10px' }}>
                            Acheter
                        </Link>
                        <Link to='/louer' style={{ textDecoration: 'none', color: 'white', padding: '0px 10px' }}>
                            Louer
                        </Link>
                        <Link to='/vendre' style={{ textDecoration: 'none', color: 'white', padding: '0px 10px' }}>
                            Vendre
                        </Link>
                        <Link to='/estimation' style={{ textDecoration: 'none', color: 'white', padding: '0px 10px' }}>
                            Estimation
                        </Link>
                        {!isLoggedIn ?
                            (<>
                                <CustomButton
                                    onClick={handleLogin}
                                    type={'contained'}
                                    text={'Connexion'}
                                    style={{ color: textColor }}
                                    iconPosition={'right'}
                                />
                            </>)
                            :
                            (<>
                                <CustomButton
                                    onClick={handleLogout}
                                    type={'contained'}
                                    text={'Déconnexion'}
                                    style={{ color: textColor }}
                                    iconPosition={'right'}
                                />
                                <IconButton
                                    onClick={handleProfil}
                                    color='inherit'
                                    size='large'
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                {
                                    userIdRoles < 4 ?
                                        <>
                                            <IconButton
                                                onClick={handleDashboard}
                                                color='inherit'>
                                                <DashboardIcon />
                                            </IconButton>
                                        </>
                                        :
                                        <></>
                                }

                            </>)
                        }
                    </Container>

                </Container>
            </Navbar>
        </header>
    );
};
export default Header
