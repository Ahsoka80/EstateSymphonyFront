import "./Main.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';



export default function Main() {

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