import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Tech from '../Tech/Tech';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main () {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <AboutProject />
        <Tech />
        <AboutMe />
      </main>
      <Footer />
    </>    
  )  
}

export default Main;