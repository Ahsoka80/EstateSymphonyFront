import React from 'react'
import './Dashboard.css'
function Dashboard() {
  return (
    <>
        <div>Bonjour Dashboard</div>

        <div className='dashboard'>
            <div class="menu">
                <ul>
                    <h3>Menu</h3>
                    <a href="/Dashboard">Accueil</a>
                    <a href="/Agendas">Agendas</a>
                    <a href="/Contact">Contact Client</a>
                    <a href="#">Gestion des biens</a> 
                </ul>
            </div>
            <div className='globalBox'>
              <div className='box'>
                
              </div>
              <div className='box'>
                
              </div>
              <div className='box'>

              </div>
              <div className='box'>
                
              </div>
            </div>
        </div>
        
    </>
  )
}

export default Dashboard