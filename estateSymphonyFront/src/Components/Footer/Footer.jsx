import { Container, Stack } from '@mui/material';
import './Footer.css'
export default function Footer() {
    return (
        <footer className='footer'>
            <Container>
                <div className='rowGlobal'>

                    <div>
                        <h3>L'Entreprise</h3>
                        <span>Nous contacter</span> 
                    </div>

                    <hr />

                    <div className='row2'>
                        <h3>Nos Services</h3>
                        <span>Accueil</span>
                        <span>Acheter</span>
                        <span>Louer</span>
                        <span>Vendre</span>
                        <span>Estimation</span>
                    </div>

                    <hr />

                    <img src="../src/assets/img/Logo_white_on_black.jpg" alt="" />
                    
                </div>
                <div className='rowRight'>
                    <span>EstateSymphony France SAS © 2024</span>
                    <span> Conditions Générales d'Utilisation</span>
                    <span>Politique Générales de Protection des Données</span>
                </div>
                
            </Container>
        </footer>
    );
}
