import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loadStripe } from '@stripe/stripe-js';
const keyPublicStripe = "pk_test_51NiNMSL13IBKWmcBnqVCCI0Cc5913gnkwN8OVf2SWTDKiykqi1Ehb0i2bdTrMVTM5ZUpQLhCGgTWR81bvdxhU42w001HRMbgd9"
const stripePromise = loadStripe(keyPublicStripe);

const Example = (props) => {


  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedDescription = localStorage.getItem("description");
    if (savedDescription) {
      setDescription(savedDescription);
    }

    return () => {
      localStorage.removeItem("description");
    };

  }, []);


  const infoAppointment = JSON.parse(localStorage.getItem("infoEvent"));

  const handleClick = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    // Realizar una petición al backend para crear una sesión de pago
    const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
    });

    const session = await response.json();

    // Redirigir al flujo de pago de Stripe
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if(result.error) {
        console.error(result.error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("description", JSON.stringify(description));
    
  }, [description]);



  return (
    <>
      <Modal
        show={props.show}
        fullscreen={props.fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Agendar cita:</Modal.Title>
          <Button variant="outline-danger" onClick={props.closedButton}>
            Close
          </Button>{" "}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Informacion de la Cita</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hora: {infoAppointment.hour}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Dia: 0{infoAppointment.date}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mes: 0{infoAppointment.month}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Button style={{marginTop: 10}}variant="outline-primary" onClick={handleClick}>Reservar cita</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Example;
