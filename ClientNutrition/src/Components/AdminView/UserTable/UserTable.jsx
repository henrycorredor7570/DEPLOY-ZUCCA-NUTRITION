import Table from "react-bootstrap/Table";
import style from "./UserTable.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/actions";
import axios from "axios";

function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);

  useEffect(() => {
    if (users.length < 1) dispatch(getUsers());
  }, [dispatch, users]);

  console.log(users);

  useEffect(() => {
    // Cargar nutricionistas activos e inactivos al montar el componente
    fetch(`/users/allUsers`)
      .then((response) => response.json())
      .then((data) => {
        // Dividir los nutricionistas en listas activas e inactivas
        const activeUserList = data.filter((user) => user.isActive);
        const inactiveUserList = data.filter((user) => !user.isActive);

        setActiveUsers(activeUserList);
        setInactiveUsers(inactiveUserList);
      });
  }, []);

  console.log(activeUsers);
  console.log(inactiveUsers);

  const activateUser = async (id) => {
    try {
      const currentUser = await axios.get("/users/" + id);
      const userState = currentUser.data.isActive;
      console.log("user state", userState);

      if (!userState) {
        await axios.put(`/users/activate/${id}`);
        // Actualizar las listas de nutricionistas
        const updatedInactiveUser = inactiveUsers.filter(
          (user) => user.id !== id
        );
        const userToRestore = inactiveUsers.find((user) => user.id === id);
        setActiveUsers((prevActiveUsers) => [
          ...prevActiveUsers,
          userToRestore,
        ]);
        setInactiveUsers(updatedInactiveUser);
      } else {
        alert("El user ya esta activado");
      }
    } catch (error) {
      console.error("Error al restaurar el usuario:", error);
    }
  };
  const token = window.localStorage.getItem("token");
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${token}`, // Encabezado de autorización con el token JWT
      'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
    },
  };
  const deleteUser = async (id) => {
    try {
      // Eliminar el usuario

      const currentUser = await axios.get("/users/" + id);
      const userState = currentUser.data.isActive;
      console.log("user state", userState);

      if (userState) {
        await axios.delete(`/users/delete/${id}`, requestOptions);
        // Actualizar las listas de usuarios
        const updatedActiveUser = activeUsers.filter((user) => user.id !== id);
        const userToBlock = activeUsers.find((user) => user.id === id);
        setInactiveUsers((prevInactiveUsers) => [
          ...prevInactiveUsers,
          userToBlock,
        ]);
        setActiveUsers(updatedActiveUser);
      } else {
        alert("El user ya esta desactivado");
      }
    } catch (error) {
      console.error("Error al bloquear el usuario:", error);
    }
  };

  const openNewWindow = (id) => {
    window.open(
      `http://localhost:5173/adminprofile/detail/users/${id}`,
      "_blank",
      "width=770, height=700"
    );
  };

  return (
    <Table striped bordered hover responsive className="shadow-sm text-center">
      <thead>
        <tr>
          <th>ID</th>

          <th key={1}>Nombre</th>
          <th key={2}>Apellidos</th>
          <th key={3}>Bloquear</th>
          <th key={4}>Desbloquear </th>
        </tr>
      </thead>
      <tbody>
        {users !== false &&
          users.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td className={style.name} onClick={() => openNewWindow(e.id)}>
                  {e.name}
                </td>
                <td className={style.name} onClick={() => openNewWindow(e.id)}>
                  {e.lastName}
                </td>

                <td>
                  <button onClick={() => deleteUser(e.id)}>X</button>
                </td>
                <td>
                  <button onClick={() => activateUser(e.id)}>O</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default UserTable;
