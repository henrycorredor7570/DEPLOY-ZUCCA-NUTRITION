import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import { dataSet } from './dataSet';
import style from './UsersDetail.module.css'
import Container from 'react-bootstrap/Container';

export default function UsersDetail() {

  const [users, setUsers] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!users)
      fetch(`/users/${id}`)
        .then((response) => response.json())
        .then((data) => { if (data.name) setUsers(data);});
    
  }, [users]);
  
  return console.log(users), (
    <Container className={style.main}>
          <Table striped bordered hover responsive className="shadow-sm text-center">
    <thead>
      <tr>

        <th key={1}>Nombre Paciente</th>
        <th key={2}>Apellidos</th>
        <th key={3}>Email</th>
            <th key={4}>Número de teléfono</th>
            <th key={5}>Review</th>
      </tr>
    </thead>
    <tbody>
          <tr key={users.id}>
            <td className={style.name}>{users.name}</td>
            <td className={style.name}>{users.lastName}</td>
            <td>{users.email}</td>
            <td>{users.phone}</td>
            <td>{users.review}</td>
          </tr>
          </tbody>
          </Table>
          
          <Table striped bordered hover responsive className="shadow-sm text-center">
          <thead>
      <tr>

        <th key={2}>Fecha de Cita</th>
        <th key={3}>Cita Completada</th>
        <th key={4}>Status</th>
      </tr>
    </thead>
    <tbody>
              {dataSet[0].map((e) => {
                  return (
                    <tr key={e.id}>
                    <td className={style.name}>{e.appointmentDate}</td>
                    <td>{e.appointmentCompleted[0].toUpperCase() + e.appointmentCompleted.slice(1)}</td>
                    <td>{e.status[0].toUpperCase() + e.status.slice(1)}</td>
                  </tr>
              )
          })}
    </tbody>
          </Table>
    </Container>
  )
}
