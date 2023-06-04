import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo_short from "../../images/logo-2-short.png";

import "../../styles/Footer.scss";

const Footer = () => {
  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      fixed="bottom"
      bg="light"
      variant="primary">
      <Container>
        <Nav className="navbar-nav d-flex flex-grow-1 column text-center justify-content-center">
          <Nav.Link>
            <img src={logo_short} height="40px" alt="" />
            <Link to="/main" className="link-to-nav-items">
              <span>© 2023 MOVING</span>
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
