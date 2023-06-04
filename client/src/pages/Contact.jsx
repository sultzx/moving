import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Bank2,
  PinMapFill,
  TelephoneFill,
  EnvelopeFill,
} from "react-bootstrap-icons";
const Contact = () => {
  return (
    <>
      <Container>
        <br />
        <Row>
          <h3>Бізбен байланыс</h3>
        </Row>
        <hr />
        <br />
        <Row>
          <Col className="col-6 d-flex row align-items-center text-start">
            <Row>
              <Col className="col-12">
                <Row>
                  <Col className="col-auto">
                    <Bank2
                      color="#fb8500"
                      size={24}
                      style={{ marginBottom: "24px" }}
                    />
                  </Col>
                  <Col>MOVING COMPANY</Col>
                </Row>
              </Col>
              <Col className="col-12">
                <Row>
                  <Col className="col-auto">
                    <TelephoneFill
                      color="#fb8500"
                      size={24}
                      style={{ marginBottom: "24px" }}
                    />
                  </Col>
                  <Col>87073245346</Col>
                </Row>
              </Col>
              <Col className="col-12">
                <Row>
                  <Col className="col-auto">
                    <EnvelopeFill
                      color="#fb8500"
                      size={24}
                      style={{ marginBottom: "24px" }}
                    />
                  </Col>
                  <Col>moving_company@gmail.com</Col>
                </Row>
              </Col>
              <Col className="col-12">
                <Row>
                  <Col className="col-auto">
                    <PinMapFill
                      color="#fb8500"
                      size={24}
                      style={{ marginBottom: "24px" }}
                    />
                  </Col>
                  <Col>Қарағанды қаласы, Қазыбек би ауданы</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {/* <Col className="col-6 ">
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
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Contact;
