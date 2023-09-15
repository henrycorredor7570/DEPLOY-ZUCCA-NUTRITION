import Table from "react-bootstrap/Table";
import style from "./ClientsTable.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cloudinary from "../../Cloudinary/Cloudinary";
import { userNutriInfo, allEvents } from "../../../redux/actions/actions";
import { filterUniqueUserIds } from "../../../utils/UserUtils";

function ClientsTable() {

  const usersNutri = useSelector(e => e.usersInfo);


  return (
    <Table striped bordered hover responsive className="shadow-sm text-center">
      <thead>
        <tr>
          <th key={1}>Nombre</th>
          <th key={2}>Apellidos</th>
          <th key={3}>Fecha de nacimiento</th>
          <th key={4}>E-mail</th>
          <th key={6}>User Id</th>
          <th key={5}>Cargar Archivo</th>
        </tr>
      </thead>
      <tbody>
        {usersNutri.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.birthDate}</td>
              <td>{user.email}</td>
              <td>{user.id}</td>
              <Cloudinary name={user.name} lastName={user.lastName}></Cloudinary>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ClientsTable;
