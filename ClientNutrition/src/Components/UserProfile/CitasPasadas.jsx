import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { filterAppointmentsBeforeCurrentTime } from "../../utils/UserUtils";
import { useEffect, useState } from "react";

const CitasPasadas = () => {
	const appointments =  JSON.parse(localStorage.getItem("appointmentslocal"));
	const nutriInfo = useSelector((e) => e.nutriInfo);
	const [before, setBefore] = useState([]);
	const beforeEvents = filterAppointmentsBeforeCurrentTime(appointments);

	useEffect(() => {
		setBefore(beforeEvents)
	},[])

  return (
    <>
      {appointments.length === 0 && appointments.length === 0 ? (
        <Alert key="secondary" variant="secondary">
          No hay citas agendadas
        </Alert>
      ) : (
        before?.map((e) => (
          <Alert>
            Descripcion: {e.purpose} Fecha: {e.date} Hora: {e.hour}{" "}
            Nutricionista: {nutriInfo.name} {nutriInfo.lastName}
          </Alert>
        ))
      )}
    </>
  );
};

export default CitasPasadas;
