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
import { getAllProperties } from '../../utils/api/properties';

const Header = (props) => {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userFirstname, setUserFirstname] = useState(' ');
    const [userLastname, setUserLastname] = useState(' ');
    const email = useEmail();
    useEffect(() => {
        if (isLoggedIn) {
            getUserEmail(email).then(data => {
                setUserFirstname(data.firstname);
                setUserLastname(data.lastname);
            })
            getAllProperties().then(dataa => {
                console.log(dataa);
            })

            console.log('Utilisateur connecté');
        } else {
            console.log('Utilisateur déconnecté');
            getAllProperties().then(dataa => {
                console.log(dataa);
            })
        }
    }, [isLoggedIn, email, userFirstname, userLastname])
    const handleLogout = () => {
        console.log('Déconnexion utilisateur..');
        logout();
    };
    const handleLogin = () => {
        navigate('/login');
    }
    const handleHome = () => {
        navigate('/');
    }
    // const handleProfil = () => {
    //     navigate('/profil');
    // }

    const {
        title,
        textColor
    } = props;

    return (
        <header className='header'>
            <Navbar>
                <Container className='containerMenu'>
                    <Navbar.Brand style={{ color: textColor }} onClick={handleHome}>
                        <span>
                            {title}
                        </span>
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

                            </>)
                        }
                    </Container>

                </Container>
            </Navbar>
        </header>
    );
};
export default Header
