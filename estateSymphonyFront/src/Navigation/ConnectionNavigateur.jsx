import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { LoginScreens } from '../Screens/LoginScreen/LoginScreens';
import { RegistrerScreen } from '../Screens/RegistrerScreen/RegistrerScreen';
import { Details } from '../Screens/Details/Details';
import Accueil from '../Componants/Accueil/Accueil';
import Main from '../Componants/Main/Main';


export const ConnectionNavigateur = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Main/>,
        children: [
          {
            path: '/login',
            element: <LoginScreens/>
          },
          {
          path: '/',
          element: <Accueil/>
          },
          {
              path: '/register',
              element: <RegistrerScreen/>
          },
          {
              path: '/details/:id',
              element: <Details/>
          }
        ],
      }
       
    ])
  return (
    <RouterProvider router={router}/>
  )
}
