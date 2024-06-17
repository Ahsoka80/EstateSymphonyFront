import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Accueil from '../Components/Accueil/Accueil';
import Main from '../Components/Main/Main';
import LoginForm from "../Screens/LoginScreen/Login";
import RegisterForm from "../Screens/RegistrerScreen/Register";
import Profil from "../Components/Profil/Profil";
import FavoriesPage from "../Components/Profil/Favories";
import Alerts from "../Components/Profil/Alerts";
import Estimates from "../Components/Profil/Estimates";
import Account from "../Components/Profil/Account";
import ProfilForm from "../Components/Profil/ProfilDetails";
import ProfilPassword from "../Components/Profil/ProfilPassword";
import Details from "../Components/Property/PropertyDetails";
import CreateRealEstate from "../Components/Profil/CreateRealEstate";
import EstatesManager from "../Components/Dashboard/EstatesManage";
import EstateDashboardUpdate from "../Components/Dashboard/EstateDashboardUpdate";
import EstateDashboardCreate from "../Components/Dashboard/EstateDashboardCreate";
import Dashboard from "../Components/Dashboard/Dashboard";
import Employees from "../Components/Dashboard/Employees/EmployeesList";
import EmployeeCreate from "../Components/Dashboard/Employees/EmployeeCreate";
import UserCreate from "../Components/Dashboard/Users/UserCreate";

export const ConnectionNavigateur = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: 'login', element: <LoginForm /> },
        { path: '/', element: <Accueil /> },
        { path: 'register', element: <RegisterForm /> },
        { path: 'details/:id', element: <Details /> },
        { path: 'profil', element: <Profil /> },
        { path: 'profil/myaccount', element: <Account /> },
        { path: 'profil/myaccount/details', element: <ProfilForm /> },
        { path: 'profil/myaccount/password', element: <ProfilPassword /> },
        { path: 'profil/myfavories', element: <FavoriesPage /> },
        { path: 'profil/myalerts', element: <Alerts /> },
        { path: 'profil/myestimates', element: <Estimates /> },
        { path: 'profil/createreal', element: <CreateRealEstate /> },
        {
          path: 'dashboard',
          element: <Dashboard />,
          children: [
            { path: 'home', element: <div>Accueil</div> },
            { path: 'agendas', element: <div>Agendas</div> },
            { path: 'contact', element: <div>Contact</div> },
            { path: 'estates', element: <EstatesManager /> },
            { path: 'estate/:id', element: <EstateDashboardUpdate /> },
            { path: 'estate/create', element: <EstateDashboardCreate /> },
            { path: 'employeesList', element: <Employees /> },
            { path: 'employee/create', element: <EmployeeCreate /> },
            { path: 'user/create', element: <UserCreate /> },
          ],
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};
