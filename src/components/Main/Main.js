import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Tech from '../Tech/Tech';
import Footer from '../Footer/Footer';

function Main () {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Footer />
    </main>    
  )  
}

export default Main;