import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, logout } from "../../redux/slices/auth.js";
import "../../styles/Header.scss";
import logo from "../../images/logo-2.png";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm"
        sticky="top"
        bg="light"
        variant="primary"
      >
        <Container fluid>
          <Navbar.Brand href="/" style={{
            color: '#D9ED92',
            fontSize: '42px',
            fontWeight: '700',
            textShadow: '2px 2px 2px #168AAD'
          }}>
            Жеткізу
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navbar-nav d-flex flex-grow-1 justify-content-center">
              <Nav.Link style={{ margin: "0 10px 0 10px" }}>
                <Link to="/main" className="link-to-nav-items">
                  Басты бет
                </Link>
              </Nav.Link>
              <Nav.Link style={{ margin: "0 10px 0 10px" }}>
                <Link to="/services" className="link-to-nav-items">
                  Көрсетілген қызметтер
                </Link>
              </Nav.Link>
              <Nav.Link style={{ margin: "0 10px 0 10px" }}>
                <Link to="/newspaper" className="link-to-nav-items">
                  Жаңалықтар
                </Link>
              </Nav.Link>
              <Nav.Link style={{ margin: "0 10px 0 10px" }}>
                <Link to="/contact" className="link-to-nav-items">
                  Бізбен байланыс
                </Link>
              </Nav.Link>
              <Nav.Link style={{ margin: "0 10px 0 10px" }}>
                <Link to="/admin" className="link-to-nav-items">
                  Админ үшін
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>

              {isAuth ? <>
                <Nav.Link>
                  <Link to={"/profile"} className="link-to-nav-items">
                    <Button variant="outline-primary" className="login-btn">
                      Жеке профиль
                    </Button>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="primary"
                    onClick={() => onClickLogout()}
                    className="registration-btn"
                  >
                    Шығу
                  </Button>
                </Nav.Link>
              </>
              :
              <>
                <Nav.Link>
                  <Link to={"/login"} className="link-to-nav-items">
                    <Button variant="outline-primary" className="login-btn">
                      Кіру
                    </Button>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/registration"} className="link-to-nav-items">
                    <Button variant="primary" className="registration-btn">
                      Тіркелу
                    </Button>
                  </Link>
                </Nav.Link>
              </>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
