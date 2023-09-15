import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./NutriData.module.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getDetail } from "../../../redux/actions/actions";
import Cloudinary from "../../Cloudinary/Cloudinary";

const NutriData = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const id = window.localStorage.getItem("id");
  const [userInformation, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  })

  useEffect(() => {
    axios.get(`/nutritionists/searchBy?id=${id}`)
    .then(({ data }) => {
      const { name, lastName, email, id } = data;
      setUserInfo({...userInformation, name, lastName, email})
    })
    
  }, [dispatch, users]);

  console.log(users[0]);
  const handleInputChange = (e) => {
    // Actualiza el estado cuando se cambia un campo de entrada
    const { name, value } = e.target;
    setUserInfo({ ...userInformation, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/nutritionists/update/${id}`, {name: userInformation.name, lastName: userInformation.lastName, email: userInformation.email, password: userInformation.password});
      return window.alert("Actualizado con exito")
    } catch (error) {
      return window.alert("Hubo un problema:", error)
    }
  }

  console.log(id);
  return (
    <Container className={style.container}>
      <h2 className="mb-4">Modificar mi perfil:</h2>
      <label>Actualizar foto de perfil:</label>
      <Cloudinary></Cloudinary>
      
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre(s):</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre..." name="name" value={userInformation.name} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Apellido(s):</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu apellido..." name="lastName" value={userInformation.lastName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu contraseña..." name="password" value={userInformation.password} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordConfirmed">
          <Form.Label>Repetir Contraseña:</Form.Label>
          <Form.Control type="text" placeholder="Repetir contraseña..." name="passwordConfirmed" value={userInformation.passwordConfirmed} onChange={handleInputChange} />
        </Form.Group>
        <Button className="my-2" variant="primary" type="submit">
          Actualizar
        </Button>
      </Form>
    </Container>
  );
};

export default NutriData;