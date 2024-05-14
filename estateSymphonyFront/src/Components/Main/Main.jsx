import "./Main.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { getUserEmail } from "../../utils/api/user";
import { useEmail } from "../../utils/api/useEmail";
import { AuthContext } from "../../AuthContext/AuthContext";



export default function Main() {
  const location = useLocation();
  const email = useEmail();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);


  useEffect(() => {

    switch (location.pathname.split('/')[1]) {
      case 'dashboard':
        getUserEmail(email).then(data => {
          if (data.idRoles > 3) { console.log('Utilisateur pas autorisé à être ici..'); navigate('/'); }
        })
        console.log(isLoggedIn);
        break;
      default:
        break;
    }
  }, [location])
  return (
    <>
      <Header title={"EstateSymphony"} textColor={'white'} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}