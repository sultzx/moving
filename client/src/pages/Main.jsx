import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo-2.png";
const Main = () => {
  return (
    <>
      <Container>
        <br />
        <Row>
          <h3>Басты бет</h3>
        </Row>
        <hr />
        <br />
        <Row>
          <Col className="col-6 d-flex row align-items-center">
            <Row>
              <Col className="col-12">
                <h3>Үй жихаздары мен басқада заттарды тез жеткізу қызметі</h3>
                <br />
              </Col>

              <Col className="col-12">
                <Link to="/profile">
                  <Button className="btn btn-primary" style={{border: '1px solid #34A0A4',
                  background: '#34A0A4', color: 'white'
                }}>Тапсырыс беру</Button>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col className="col-6 ">
            <Card className="profile-card">
              <Card.Body
                className=" d-flex  align-items-center"
                style={{ height: "400px" }}
              >
                <img
                  src={logo}
                  className="flex-fill"
                  style={{ maxHeight: "140px" }}
                  alt=""
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
