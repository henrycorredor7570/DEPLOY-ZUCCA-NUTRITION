import styles from "./Home.module.css";
import CarouselH from "../CarouselH/CarouselH";
import Cards from "../Cards/Cards";
import AccordionHome from "../AccordionHome/AccordionHome";
import WhyComponent from "../WhyComponent/WhyComponent";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className={styles.text}> 
          <CarouselH />
          <WhyComponent />
          <Cards />
          <br />
        
          <AccordionHome />
          <br />
          <Alert key={'secondary'} variant={'secondary'} className="text-center">
          <Link to="/termsandconditions">Política de Privacidad / Términos y condiciones</Link>
          </Alert>     
        </div>
    )
}
