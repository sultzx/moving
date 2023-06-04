import { Col, Card,Row, Button } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
const CarBody = ({id, title, model, number, color, body, driver, rating, img, select}) => {

  console.log(rating?.reduce((a, b) => a + b, 0) / rating?.length)
  return (
    <>
      <Col xs={12} lg={3} md={3} sm={12}>
        <Card
          className="car-body-card flex-fill"
          onClick={select}
          >
          <Card.Body>
            <div className="d-flex column justify-content-center">
              <img className="car-body-img img-fluid cover text-center" src={img} alt="asd" />
            </div>
            <hr />
            <Card.Title>{color} {title} {model} </Card.Title>
            <p style={{fontSize: '30px'}}>{number}</p>
            <p>Кузов түрі: {body}</p>
            <hr />
            <Row>
              <Col md={4}>
                <img src={`http://localhost:5000${driver?.avatar}`} className="img-fliud" width={'100px'} height={'100px'} style={{
                  border: '1px solid ',
                  borderRadius: '50%'
                }} />
              </Col>
              <Col md={8}>
                <h5>{driver?.name}</h5>
                <h6>{driver?.phone}</h6>
                <Rating  size={30} readonly initialValue={rating?.reduce((a, b) => a + b, 0) / rating?.length} /> &nbsp; 
                <span style={{
                  fontSize: '18px'
                }}>{rating?.reduce((a, b) => a + b, 0) / rating?.length}</span>
              </Col>
              <Col md={12} className="text-end">
                <br />
               <Button className="btn btn-primary" onClick={() => {window.location.assign(`http://localhost:3000/${id}/comments`)}}>Пікірлерді қарау</Button>
              </Col>
            </Row>
           
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};



export default CarBody;
