import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Cancel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Card
          className="h-100"
          style={{ width: "18rem", backgroundColor: "orange" }}
        >
          <Card.Body>
            <Card.Title>NO SE HA PODIDO PROCESAR EL PAGO</Card.Title>
            <Card.Text>VUELVA A INTENTAR!</Card.Text>
          </Card.Body>
          <Link to="/">
            <button>Volver</button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Cancel;
