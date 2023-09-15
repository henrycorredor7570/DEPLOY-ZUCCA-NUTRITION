import { useState, useEffect } from "react";
import style from "./AdminInformation.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Validate } from "./Validate";
import axios from "axios";

export default function   Create() {
  const [userInformation, setInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  }); 

  let [db, setDB] = useState();

  const token = window.localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const id = window.localStorage.getItem("id")
    if (!db) {
      fetch(`/users/${id}`) // Ver la posibilidad de una ruta especifica
      .then((response) => response.json())
      .then((data) => {
        setDB(data)
        const { name, lastName, email, id } = data;
        setInfo({...userInformation, name, lastName, email, id})
      });
    }
    
    
    
  }, [db, userInformation]);

  const [errors, setErrors] = useState({
    errors: "zero",
  });

  const changeHandler = (field, value) => {
    setInfo({
      ...userInformation,
      [field]: value,
    });

    setErrors(
      Validate({
        ...userInformation,
        [field]: value,
      })
    );
  };

  const requestOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !errors.name1 &&
      !errors.lastName1 &&
      !errors.email1 &&
      !errors.password1 &&
      !errors.errors
    ) {
      if (
        userInformation.name.length > 0 &&
        userInformation.lastName.length > 0 &&
        userInformation.email.length > 0
      ) {
        if (
          db.lastName !== userInformation.lastName ||
          db.name !== userInformation.name ||
          db.email !== userInformation.email ||
          (userInformation.passwordConfirmed === userInformation.password &&
            userInformation.password.length > 0 &&
            userInformation.password !== db.password)
        ) {

          axios.put('/users/update', { name: userInformation.name, lastName: userInformation.lastName, email: userInformation.email, password: userInformation.password  }, requestOptions).catch((error) => {console.log(error)})
          setInfo({ ...userInformation, password: "", passwordConfirmed: "" });
          
          alert("La información fue actualizada de manera exitosa!");
        } else {
          alert(
            "Verifica que los campos 'Nombre', 'Apellido' o 'Correo' no sean iguales al anterior."
          );
        }
      } else {
        alert("Por favor, completa todos los campos.");
      }
    } else {
      alert("Modifica un campo o completa la contraseña.");
    }
  };

  return console.log(errors), (
    <Container className={style.container}>
      <h2 className="mb-4">Modifica tu información de perfil:</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre(s):</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre..."
            onChange={(event) => {
              changeHandler("name", event.target.value);
            }}
            isInvalid={errors.name1 && userInformation.name.length > 0}
            isValid={!errors.name1 && userInformation.name.length > 0 && true}
            value={userInformation.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name1 && "El nombre no puede incluir numeros."}
          </Form.Control.Feedback>
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          <div className="valid-feedback">Se ve perfecto!</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Apellidos:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tus Apellidos..."
            onChange={(event) => {
              changeHandler("lastName", event.target.value);
            }}
            isInvalid={errors.lastName1 && userInformation.lastName.length > 0}
            isValid={
              !errors.lastName1 && userInformation.lastName.length > 0 && true
            }
            value={userInformation.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName && "Ingresa tus apellidos."}
            {errors.lastName1 && "Los apellidos no pueden incluir numeros."}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu Email..."
            onChange={(event) => {
              changeHandler("email", event.target.value);
            }}
            isInvalid={errors.email1 && userInformation.email.length > 0}
            isValid={!errors.email1 && userInformation.email.length > 0 && true}
            value={userInformation.email}
          />
          <Form.Control.Feedback type="invalid">
            Verifica la información del email.
          </Form.Control.Feedback>
          <div className="valid-feedback">Correo correcto.</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Nueva contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña..."
            onChange={(event) => {
              changeHandler("password", event.target.value);
            }}
            isInvalid={errors.password1 && userInformation?.password.length > 0}
            isValid={
              !errors.password1 && userInformation?.password?.length > 0 && true
            }
          />
          <Form.Control.Feedback type="invalid">
            Contraseña debe contener 6 caracteres o mas, una mayuscula y un
            caracter especial.
          </Form.Control.Feedback>
          <div className="valid-feedback">Formato correcto.</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordConfirmed">
          <Form.Label>Confirma tu nueva contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña..."
            onChange={(event) => {
              changeHandler("passwordConfirmed", event.target.value);
            }}
            isInvalid={
              (errors.password1Confirmed &&
                userInformation?.passwordConfirmed.length > 0) ||
              (errors.passwordEqual &&
                userInformation?.passwordConfirmed.length > 0)
            }
            isValid={
              !errors.passwordEqual &&
              userInformation?.passwordConfirmed?.length > 0 &&
              true
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.password1Confirmed &&
              "Contraseña debe contener 6 caracteres o mas, una mayuscula y un caracter especial."}
            {errors.passwordEqual && "Las contraseñas deben de ser iguales"}
          </Form.Control.Feedback>
          <div className="valid-feedback">Formato correcto.</div>
        </Form.Group>

        <Button className="my-2" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
