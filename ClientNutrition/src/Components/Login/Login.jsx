import { useState, useEffect } from "react";
import style from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login, getUsers } from './../../redux/actions/actions'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { coordinator } from "../../utils/UserUtils";
import GoogleLogin from "./GoogleLogin/GoogleLogin";
const clientId = "659206981480-kto0rcmeb3puh10fht8626diq6176m1q.apps.googleusercontent.com";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
  const allUsers = useSelector((state) => state.users)
  const admins = useSelector((state) => state.admins)
  
  

  useEffect(() => {

      dispatch(getUsers()); // Corrected: Invoke the action function
    
  }, []);
  

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isNutritionist: false,
  });

  const userEmail = credentials.email
  console.log(userEmail);

  const [ userCredentialsOauth, setUserCredentialsOauth ] = useState({
    isNutritionist: false,
  })

  useEffect(() => {
    if (user == null) {
      return
    }
    navigate(coordinator().profile)
  }, [user])

  const changeHandler = (field, value) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
    setUserCredentialsOauth({
      [field]: value,
    })
  };

const all = [...admins, ...allUsers]
console.log('todos ',all);
 
  const handleLogin = async (event) => {
    event.preventDefault();
    // Find the user in allUsers array by email
    const userToLogin = all.find((user) => user.email === credentials.email);

    console.log('usuario',userToLogin);
    console.log(credentials);
    if(credentials.isNutritionist){
      return dispatch(login(credentials, handleLoginError));
    }
    if(userToLogin.role==='admin'){
      return dispatch(login(credentials, handleLoginError));
    }

    if (userToLogin.role==='user') {
      // Check if the user is active
      if (userToLogin.isActive) {
        // User is active, dispatch the login action
        dispatch(login(credentials, handleLoginError));
      } else {
        // User is not active, show an alert
        alert("The user is blocked.");
      }
    } else {
        // User not found, show an alert or handle as needed
        alert("User not found. Please check your credentials.");
    }
  }

  function handleLoginError(error) {
    alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
  }

  /*const googleLogin = () => {
    window.open(url, "_blank");
  };*/


  return (
      <Container className={style.container}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12}>
            <h2 className="mb-4">Ingresa correo electrónico y contraseña</h2>
            <Form>
              <Form.Group className="mb-3" controlId="user">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu correo electrónico"
                  onChange={(event) => {
                    changeHandler("email", event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña..."
                  onChange={(event) => {
                    changeHandler("password", event.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe contener 6 caracteres o más, una mayúscula
                  y un caracter especial.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <GoogleLogin clientId={ clientId } isNutritionist={userCredentialsOauth}/>
                <Button
                  className="my-2"
                  variant="primary"
                  type="submit"
                  onClick={handleLogin}
                >
                  INGRESAR
                </Button>
              </div>
              {/* <div className="d-flex justify-content-end">
                <Button
                  className="my-2"
                  variant="primary"
                  type="submit"
                  onClick={googleLogin}
                >
                  INGRESA CON GOOGLE
                </Button>
              </div>
                */ }
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Eres nutricionista?"
                onChange={() => changeHandler("isNutritionist", !credentials.isNutritionist)}
              />
            </Form>
          </Col>
        </Row>
      </Container>
  );
}