import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Details } from '../Screens/Details/Details';
import Accueil from '../Components/Accueil/Accueil';
import Main from '../Components/Main/Main';
import LoginForm from "../Screens/LoginScreen/Login";
import RegisterForm from "../Screens/RegistrerScreen/Register";

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
        }
      ],
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
