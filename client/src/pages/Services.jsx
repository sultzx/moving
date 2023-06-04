import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Form,
    Alert,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";

  import img2 from '../images/123.png'

const Services = () => {
 return (   <Container>
    <br />
    <Row>
      <h3>Көрсетілген қызметтер</h3>
    </Row>
    <hr />
    <br />
    <Row>
      <Col className="col-4">
        <Card className="profile-card">
          <Card.Body
            className=" d-flex row  align-items-center"
            style={{ height: "400px", padding: '24px' }}
          >
            <img
              src="https://d2j6dbq0eux0bg.cloudfront.net/images/29044170/2782525780.jpg"
              className="flex-fill"
              style={{ maxHeight: "200px" }}
              alt=""
            />
            <Row>
                <Col className="col-12">
                    <h4 style={{color:"white"}}>Ыңғайлы тарифтар</h4>
                </Col>
                <Col className="col-12">
                    <p>Біз клиенттерге ең ыңғайлы тасымалдау тарифтарын ұсына аламыз</p>
                </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-4">
        <Card className="profile-card">
          <Card.Body
            className=" d-flex row  align-items-center"
            style={{ height: "400px", padding: '24px' }}
          >
            <img
              src={img2}
              className="flex-fill"
              style={{ maxHeight: "200px" }}
              alt=""
            />
            <Row>
                <Col className="col-12">
                    <h4 style={{color:"white"}}>Тасымалдауды бақылау</h4>
                </Col>
                <Col className="col-12">
                    <p>Клиенттің тапсырысын бақылауға ала отырып, барынша тез қызмет көрсетеміз</p>
                </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-4">
        <Card className="profile-card">
          <Card.Body
            className=" d-flex row  align-items-center"
            style={{ height: "400px", padding: '24px' }}
          >
            <img
              src="https://i.unisa.edu.au/siteassets/askit/cyber-security/graphics/cybersecurity-main.png"
              className="flex-fill"
              style={{ maxHeight: "200px" }}
              alt=""
            />
            <Row>
                <Col className="col-12">
                    <h4 style={{color:"white"}}>Қауіпсіздік бірінші орында</h4>
                </Col>
                <Col className="col-12">
                    <p>Біз үшін клиенттердің заттарының қауіпсіздігі бірінші назарда болады</p>
                </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>)
}

export default Services