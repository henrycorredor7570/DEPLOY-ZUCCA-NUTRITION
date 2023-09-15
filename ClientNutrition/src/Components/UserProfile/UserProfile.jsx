import style from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { Button, Alert, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAppointments, getNutritionist, getUsersId } from "../../redux/actions/actions";
import DownloadCloudinary from "../Cloudinary/Download"
import dayjs from "dayjs";
import Proximas from "./ProximasCitas";
import CitasPasadas from "./CitasPasadas";

export default function UserProfile() {
  //const appointments = useSelector((e) => e.appointments);
  
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const appointments =  JSON.parse(localStorage.getItem("appointmentslocal"));

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    console.log("este es el id", id);
    if(appointments.length < 1){
      dispatch(getAppointments(id))
    }
    console.log("todos los eventos",appointments);
  },[appointments])
 

  useEffect(() => {
    const nutriId = window.localStorage.getItem("nutriId");
    if (nutriId) {
      dispatch(getNutritionist(nutriId));
    }
    }, []);
  return (
    <Row>
      <Col>
        <NavBar />
        <h1>Citas</h1>
        <Link to={"/appointments/new"}>
          <Button variant="primary">+ Nueva cita</Button>
        </Link>
        <br />
        <br />
        <h2>Próximas</h2>
        <Proximas />
        <h2>Pasadas</h2>
        <Card>
          <CitasPasadas />
          {/* <Card.Body>
                    <Card.Title>Primera cita</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">04 de agosto de 2023 </Card.Subtitle>
                    <DownloadCloudinary name={user.name} lastName={user.lastName}></DownloadCloudinary>
                </Card.Body> */}
        <DownloadCloudinary name={user.name} lastName={user.lastName}></DownloadCloudinary>
        </Card>
      </Col>
    </Row>
  );
}
