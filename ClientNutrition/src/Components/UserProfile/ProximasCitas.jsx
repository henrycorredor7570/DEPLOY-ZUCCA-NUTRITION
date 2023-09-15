import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { filterEventsAfterCurrentDateTime } from "../../utils/UserUtils";
import { useEffect, useState } from "react";

const Proximas = () => {
  const appointments =  JSON.parse(localStorage.getItem("appointmentslocal"));
  const nutriInfo = useSelector((e) => e.nutriInfo);
  const [current, setCurrent] = useState([]);
  const currentEvent = filterEventsAfterCurrentDateTime(appointments);
  useEffect(() => {
    setCurrent(currentEvent);
  }, []);
  return (
    <>
      {appointments.length === 0 && appointments.length === 0 ? (
        <Alert key="secondary" variant="secondary">
          No hay citas agendadas
        </Alert>
      ) : (
        current?.map((e) => (
          <Alert>
            Descripcion: {e.purpose} Fecha: {e.date} Hora: {e.hour}{" "}
            Nutricionista: {nutriInfo.name} {nutriInfo.lastName}
          </Alert>
        ))
      )}
    </>
  );
};

export default Proximas;
