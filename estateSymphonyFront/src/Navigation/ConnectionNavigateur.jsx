import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Accueil from '../Components/Accueil/Accueil';
import Main from '../Components/Main/Main';
import LoginForm from "../Screens/LoginScreen/Login";
import RegisterForm from "../Screens/RegistrerScreen/Register";
import Profil from "../Components/Profil/Profil"
import FavoriesPage from "../Components/Profil/Favories";
import Alerts from "../Components/Profil/Alerts";
import Estimates from "../Components/Profil/Estimates";
import Account from "../Components/Profil/Account";
import ProfilForm from "../Components/Profil/ProfilDetails";
import ProfilPassword from "../Components/Profil/ProfilPassword";
import Details from "../Components/Property/PropertyDetails";
export const ConnectionNavigateur = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/login',
          element: <LoginForm />
        },
        {
          path: '/',
          element: <Accueil />
        },
        {
          path: '/register',
          element: <RegisterForm />
        },
        {
          path: '/details/:id',
          element: <Details />
        },
        {
          path: '/profil',
          element: <Profil />
        },
        {
          path: '/profil/myaccount',
          element: <Account />
        },
        {
          path: '/profil/myaccount/details',
          element: <ProfilForm />
        },
        {
          path: '/profil/myaccount/password',
          element: <ProfilPassword />
        },
        {
          path: '/profil/myfavories',
          element: <FavoriesPage />
        },
        {
          path: '/profil/myalerts',
          element: <Alerts />
        },
        {
          path: '/profil/myestimates',
          element: <Estimates />
        },
      ],
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
