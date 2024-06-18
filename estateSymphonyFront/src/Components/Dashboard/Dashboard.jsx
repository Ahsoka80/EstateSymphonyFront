import { Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import CustomButton from '../Buttons/CustomButton';

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => { navigate(path); };

  return (
    <div className="dashboard-container">
      <div className="menu">
        <h3>Menu</h3>
        <ul>
          <li><CustomButton text={'Accueil'} onClick={() => handleNavigation('/dashboard/home')}></CustomButton></li>
          <li><CustomButton text={'Employés'} onClick={() => handleNavigation('/dashboard/employeesList')}></CustomButton></li>
          <li><CustomButton text={'Agendas'} isEnabled={true} onClick={() => handleNavigation('/dashboard/agendas')}></CustomButton></li>
          <li><CustomButton text={'Contact'} isEnabled={true} onClick={() => handleNavigation('/dashboard/contact')}></CustomButton></li>
          <li><CustomButton text={'Biens'} onClick={() => handleNavigation('/dashboard/estates')}></CustomButton></li>
          <li><CustomButton text={'Quartiers'} onClick={() => handleNavigation('/dashboard/districts')}></CustomButton></li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
