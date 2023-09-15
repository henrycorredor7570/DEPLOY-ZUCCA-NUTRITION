import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import { dataSet } from './dataSet';
import style from './NutriDetail.module.css'
import Container from 'react-bootstrap/Container';

export default function NutriDetail() {
  const [nutritionist, setNutri] = useState(false);

  const {id} = useParams();
    
  useEffect(() => {
    if (!nutritionist)
      fetch(`/nutritionists/searchBy?id=${id}`)
        .then((response) => response.json())
        .then((data) => { if (data.name) setNutri(data);});
    
  }, [nutritionist]);

  return console.log(nutritionist), (
      <Container className={style.main}>
          <Table striped bordered hover responsive className="shadow-sm text-center">
    <thead>
      <tr>

        <th key={1}>Nombre Nutricionista</th>
        <th key={2}>Apellidos</th>
        <th key={3}>Email</th>
        <th key={4}>Número de citas</th>
      </tr>
    </thead>
    <tbody>
          <tr key={nutritionist.id}>
            <td className={style.name}>{nutritionist.name}</td>
            <td className={style.name}>{nutritionist.lastName}</td>
            <td className={style.name}>{nutritionist.email}</td>
          </tr>
          </tbody>
          </Table>
          
          <Table striped bordered hover responsive className="shadow-sm text-center">
          <thead>
      <tr>

        <th key={1}>Paciente</th>
        <th key={2}>Fecha de Cita</th>
        <th key={3}>Cita Completada</th>
        <th key={4}>Status</th>
      </tr>
    </thead>
    <tbody>
              {dataSet[id - 1].map((e) => {
                  return (
                    <tr key={e.id}>
                    <td className={style.name}>{e.patient}</td>
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
