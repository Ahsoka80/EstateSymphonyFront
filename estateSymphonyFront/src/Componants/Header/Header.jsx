import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css"
import CustomButton from '../Buttons/CustomButton';
import Link from '@mui/material/Link';



export default function Header(props){
    const {
        title,
        textColor
    } = props;

    return (
        <header className='header'>
            <Navbar className='header1'>
                <Container>
                    <Navbar.Brand style={{color : textColor}} href=''>
                        <span>
                            {title}
                        </span>
                    </Navbar.Brand>
                    <Container style={{display : 'flex', justifyContent : 'end'}}>
                        <Link to='/accueil' style={{textDecoration : 'none', color : 'white', padding : '0px 10px' }}>
                            Accueil
                        </Link>
                        <Link to='/acheter' style={{textDecoration : 'none', color : 'white', padding : '0px 10px' }}>
                            Acheter
                        </Link>
                        <Link to='/louer' style={{textDecoration : 'none', color : 'white', padding : '0px 10px' }}>
                            Louer
                        </Link>
                        <Link to='/vendre' style={{textDecoration : 'none', color : 'white', padding : '0px 10px' }}>
                            Vendre
                        </Link>
                        <Link to='/estimation' style={{textDecoration : 'none', color : 'white', padding : '0px 10px' }}>
                            Estimation
                        </Link>
                    </Container>
                    <CustomButton  type={'contained'} text={'Connexion'} style={{color : textColor}} iconPosition={'right'}/>
                </Container>
            </Navbar>
        </header>
    );
}
