import { Outlet, useNavigate } from 'react-router-dom';
import { useEmail } from "../../utils/api/useEmail";
import './Dashboard.css';
import CustomButton from '../Buttons/CustomButton';
import { useEffect, useState } from 'react';
import { getUserEmail } from "../../utils/api/user";

function Dashboard() {
  const navigate = useNavigate();
  const email = useEmail();
  const handleNavigation = (path) => { navigate(path); };
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    getUserEmail(email).then(data => {
      if (data.idRoles == 2) { setIsAdmin(false); setIsManager(true) }
      else if (data.idRoles == 1) { setIsAdmin(true); setIsManager(true) }
      else { setIsAdmin(false); setIsManager(false) }
    })
  })

  return (
    <div className="dashboard-container">
      <div className="menu">
        <ul>
          {isAdmin ? <li color='red'>ADMINISTRATEUR</li> : <></>}
          {/* <li><CustomButton text={'Accueil'} onClick={() => handleNavigation('/dashboard/home')}></CustomButton></li> */}
          <li><CustomButton text={'Employés'} isEnabled={!isManager} onClick={() => handleNavigation('/dashboard/employeesList')}></CustomButton></li>
          <li><CustomButton text={'Agendas'} isEnabled={true} onClick={() => handleNavigation('/dashboard/agendas')}></CustomButton></li>
          <li><CustomButton text={'Contact'} isEnabled={true} onClick={() => handleNavigation('/dashboard/contact')}></CustomButton></li>
          <li><CustomButton text={'Biens'} onClick={() => handleNavigation('/dashboard/estates')}></CustomButton></li>
          <li><CustomButton text={'Quartiers'} onClick={() => handleNavigation('/dashboard/districts')}></CustomButton></li>
          <li><CustomButton text={'Dossier client'} isEnabled={true} onClick={() => handleNavigation('/dashboard/clientFolder/create')}></CustomButton></li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
