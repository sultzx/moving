import { Container, Row, Col, Button, Card } from "react-bootstrap";
const News = () => {
    return (<>
        <Container>
    <br />
    <Row>
      <h3>Жаңалықтар</h3>
    </Row>
    <hr />
    <br />
    <Row>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Жүйе ішіндегі жаңартылулар</Card.Title>
            <Card.Subtitle>02-02-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішіне көптеген жаңартылулар енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Жаңа қызмет түрі</Card.Title>
            <Card.Subtitle>18-01-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішіне жаңа қызмет түрі енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Клиент профилі</Card.Title>
            <Card.Subtitle>15-01-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішінде клиент профилі енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Тапсырыстар панелі</Card.Title>
            <Card.Subtitle>12-01-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішінде тапсырыстар панелі енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Жаңа қызмет түрі</Card.Title>
            <Card.Subtitle>10-01-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішіне жаңа қызмет түрі енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-3">
        <Card className="profile-card" style={{marginBottom: '24px'}}>
          <Card.Body
            className=" d-flex row align-items-center"
            style={{ height: "200px", padding: '24px' }}
          >
            <Card.Title>Жаңарту панелі</Card.Title>
            <Card.Subtitle>09-01-2023</Card.Subtitle>
            <Card.Text>Веб-қосымша ішіне жаңарту панелі енгізілді</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>)
    </>)
}

export default News