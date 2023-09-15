import style from "../AccordionHome/AccordionHome.module.css";
import Accordion from 'react-bootstrap/Accordion';
import ZUCCA from "../../assets/ZUCCA.png"

export default function AccordionHome() {

  return (
    <div className={style.divConAlturaViewport} id="como-trabajamos">
    <div className={style.text}> Cómo trabajamos? </div>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" >
        <Accordion.Header>Idioma</Accordion.Header>
        <Accordion.Body>
        Ofrecemos nuestros servicios en español, para que puedas comunicarte y entender completamente todo el proceso.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Condiciones de la sesión</Accordion.Header>
        <Accordion.Body>
        Para garantizar una interacción efectiva y personalizada, requerimos que las sesiones se realicen a través de la plataforma de videollamadas Google Meet. Además, es obligatorio tener la cámara prendida durante la sesión. Esto nos permite comunicarnos de manera más efectiva.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Duración de las sesiones</Accordion.Header>
        <Accordion.Body>
        Las sesiones tienen una duración de entre 45 y 60 minutos.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Tarifa</Accordion.Header>
        <Accordion.Body>
        Cada sesión tiene un valor de 55USD.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Modalidad de pago</Accordion.Header>
        <Accordion.Body>
        Aceptamos pagos en línea con tarjetas. Puedes elegir la opción que te resulte más conveniente, y te proporcionaremos instrucciones claras para completar el proceso de pago de manera segura.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header>Planificación</Accordion.Header>
        <Accordion.Body>
        Entendemos que estás listo para comenzar tu viaje hacia una vida más saludable. Trabajamos para asegurarnos de que puedas programar tu cita en un plazo de 7 días desde tu solicitud inicial. Queremos que comiences a sentir los beneficios lo antes posible.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <img src={ZUCCA} alt="Zucca" className={style.centeredImage}/>
       </div>
  );
}
