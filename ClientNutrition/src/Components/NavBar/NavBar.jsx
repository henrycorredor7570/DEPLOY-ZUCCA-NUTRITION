
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ZuccaLogoNav from "../../assets/ZuccaLogoNav.png";
import { Button, Image } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom"; // Cambia el alias de Link a ScrollLink
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './../../redux/actions/actions'
import defaultUserIcon from '../../assets/default-user-icon-profile.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';



function NavBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user)

  function drawNavbar() {
    return user ? drawLoggedInNavbar() : drawDefaultNavbar()
  }

  function handleLogout() {
    dispatch(logout())
    navigate("/")
  }

  function drawDefaultNavbar() {
    const navbar = [];

    if (pathname === "/") {
      navbar.push(
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ marginTop: "20px" }}>
            {/* Utiliza ScrollLink en lugar de Nav.Link para lograr el desplazamiento suave */}
            <ScrollLink to="por-que-zucca" smooth={true} duration={500} className="nav-link mb-3">
              ¿Por qué Zucca?
            </ScrollLink>
            <ScrollLink to="quienes-nos-eligen" smooth={true} duration={500} className="nav-link mb-3">
              Quienes nos eligen
            </ScrollLink>
            <ScrollLink to="como-trabajamos" smooth={true} duration={500} className="nav-link mb-3">
              ¿Cómo trabajamos?
            </ScrollLink>
          </Nav>
        </Navbar.Collapse>
      );
    }

    if (pathname !== "/login" && pathname !== "/signup") {
      navbar.push(
        <Nav>
          <Link to="/login">
            <Button variant="outline-secondary">Iniciar sesión</Button>
          </Link>
          <Link to="/signup" style={{ marginLeft: "10px" }}>
            <Button variant="primary">Registrarse</Button>
          </Link>
        </Nav>
      );
    }

    return navbar;
  }

  function drawLoggedInNavbar() {
    return (
      <NavDropdown
        title={
          <>
            <Image
              className={styles.profilePicture}
              src={defaultUserIcon}
            />
            {user.name}
          </>
        }
      >
        <NavDropdown.Item
          href={
            user.role === "admin"
              ? "/adminprofile"
              : user.role === "user"
              ? "/appointments"
              : "/nutritionistprofile"
          }
        >
          Perfil
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => handleLogout()}>
          Cerrar sesión
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
      <Navbar fixed="top" bg="white" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <Image className={styles.logo} src={ZuccaLogoNav} />
          </Navbar.Brand>
          {drawNavbar()}
        </Container>
      </Navbar>
  );
}

export default NavBar;


