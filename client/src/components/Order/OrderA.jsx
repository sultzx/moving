import React from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchCreateComment, fetchDeleteOrder, fetchSelectOtherDriver, fetchStatusOrder } from "../../redux/slices/order";
import { Rating } from 'react-simple-star-rating'
import "../../styles/Orders.scss";
import CarBody from "../CarBody/CarBody";
import { fetchAuthMe } from "../../redux/slices/auth";

const OrderA = ({
  i,
  id,
  title,
  datetime,
  description,
  category,
  car,
  cars,
  clientPrice,
  driverPrice,
  driver,
  status,
  img,
  isOwner,
  response
}) => {
  const [hover, setHover] = React.useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const datetimeColorHandler = () => {
    switch (datetime) {
      case "Бүгін":
        return "today";
      case "Ертең":
        return "tomorrow";
      case "Осы апта":
        return "week";
      case "Мүмкіндігінше тез":
        return "fastly";
      default:
        return "datepick";
    }
  };

  const onClickRemove = async () => {

    if (window.confirm('Точно оширгин кеп тур ма?')) {
      let data = await dispatch(fetchDeleteOrder(id))
      response(data && data.payload && data.payload.message)
    }
  };

  console.log(car && car)

  /////////////////////////////////////

    const [selectedCar, setSelectedCar] = React.useState(
     car?.brand
    );

    const [show, setShow] = React.useState(false);

    const [selectedCarShow, setSelectedCarShow] = React.useState(false)

    const [commentShow, setCommentShow] = React.useState(false)

    const [price, setPrice] = React.useState(clientPrice)

    const [comment, setComment] = React.useState(clientPrice)

    const [rating, setRating] = React.useState(0)

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectedCarClose = () => setSelectedCarShow(false);
  const handleSelectedCarShow = () => setSelectedCarShow(true);

  const handleCommentClose = () => setCommentShow(false);
  const handleCommentShow = () => setCommentShow(true);

  const handleSelectCar = (data) => {
    setSelectedCar(data);
    handleClose();
    handleSelectedCarShow()
  };
  /////////////////////////////////////

  console.log(selectedCar && selectedCar?._id)

  const selectOtherDriver = async () => {
    await dispatch(fetchSelectOtherDriver({
      id: id,
      price: price,
      car: selectedCar?._id
    }))
    window.location.reload()
  }

  const sortedDriver = []

  driver?.forEach(d => {
    if (d != false) {
      sortedDriver.push(d)
    }
    
  })

  const setStatus = async () => {

    const data = await dispatch(fetchStatusOrder({
      id: id,
      status: 'Тапсырыс орындалуда'
    }))

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    dispatch(fetchAuthMe());
    window.location.assign('http://localhost:3000/orders')
  }

  const closeProject = async () => {

    const data = await dispatch(fetchStatusOrder({
      id: id,
      status: 'Тапсырыс аяқталды'
    }))

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    dispatch(fetchAuthMe());
    window.location.reload()
  }

  

  // Catch Rating value
  const handleRating = (rate) => {

    setRating(rate)

    // other logic
  }

  console.log('rating', rating && rating)

  const createComment = async () => {
    if (rating && comment && car)
    await dispatch(fetchCreateComment({
      car: car?._id,
      rating: rating && rating,
      comment: comment && comment
    }))
  }

  return (
    <>
      <Card
        className="order-card"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Card.Body className="d-flex row align-items-start">
          <Container>
            <Row>
              <Col className="col-lg-8 col-md-6 col-sm-6 col-xs-6 card-title">
                №{i + 1} • {title}
              </Col>

              <Col className="col-lg-4 col-md-6 col-sm-6 col-xs-6  text-end">
                <button
                  className="btn delete-order-btn"
                  hidden={isOwner ? false : true}
                  onClick={() => navigate(`/update-order/${id}`)}
                >
                  <PencilFill
                    hidden={hover ? false : true}
                    className="icon"
                    size={24}
                  />
                </button>
                <button
                  className="btn delete-order-btn"
                  hidden={isOwner ? false : true}
                  onClick={onClickRemove}
                >
                  <TrashFill
                    hidden={hover ? false : true}
                    className="icon"
                    size={24}
                  />
                </button>
              </Col>
              <Col className="col-12">
                <span className={`order-card-date ${datetimeColorHandler()}`}>
                  {datetime}
                </span>
                <Row>
                  <Col>
                    <hr style={{ marginTop: "24px" }} />
                  </Col>
                  <Col className="col-auto">
                    <p
                      style={{
                        margin: "10px 12px 6px 0px",
                        fontWeight: "500",
                        fontStyle: "oblique",
                        fontSize: '18px',
                      }}
                    >
                      {category}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <p className="order-card-discription for-owner">{description}</p>
                <Row>
                  <Col md={12}>
                    <div style={{
                      border: '1px solid',
                      borderRadius: '12px',
                      margin: '0px auto 12px auto',
                      background: 'white'
                    }}>
                      <Row>
                        <Col md={6} className="d-flex column align-items-center text-center">
                          <img src={`http://localhost:5000${car?.img}`} style={{ borderRadius: '12px' }} alt="" />
                        </Col>
                        <Col md={6} className="d-flex row">
                          <p></p>
                          <h5 style={{ marginLeft: '12px' }}>{car?.color} {car?.brand} {car?.model}</h5>
                          <h6 style={{ marginLeft: '12px' }}>Нөмірі: {car?.number}</h6>
                          <h6 style={{ marginLeft: '12px' }}>Кузов: {car?.body}</h6>
                          <Row >

                            <Col md={4} className="d-flex  text-start">
                              <img src={`http://localhost:5000${sortedDriver[0]?.avatar}`}
                                style={{ marginLeft: '12px', width: '80px', height: '80px', border: '1px solid', borderRadius: '6px' }} alt="" />
                            </Col>
                            <Col md={8} className="d-flex row align-items-center">
                              <h6 style={{ marginLeft: '12px' }}>{sortedDriver[0]?.name}</h6>
                              <p style={{ marginLeft: '12px', color: 'black' }}>{sortedDriver[0]?.phone}</p>

                            </Col>


                            <p style={{ marginLeft: '12px', color: 'black', fontSize: '14px' }}>
                              <Rating readonly size={26} initialValue={
                               car?.rating?.length == 0 ? 0 :   car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length
                            } /> {car?.rating?.length == 0 ? 0 : car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length }</p>
                          </Row>
                          <br />

                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div style={{
                      border: '1px solid',
                      borderRadius: '12px',
                      margin: '0px auto 12px auto',
                      background: 'white',
                      padding: '12px'
                    }}>
                      <Row>
                        <Col md={6}>

                          <h6>Сіз ұсынған баға:</h6>
                          <h3 style={{ color: '#52B69A', fontWeight: '600', textShadow: '0px 0px 2px black' }}>{clientPrice} KZT</h3>

                        </Col>
                        <Col md={6} className="d-flex row align-items-center text-end">

                        {
                          driverPrice == 0 ? <h5 style={{color: '#FB8500'}}>Жүргізуші жауабы күтілуде</h5> : 
                          <>
                          <h6>Жүргізуші ұсынған баға:</h6>
                          <h3 style={{
                            color: clientPrice === driverPrice ? '#52B69A' :
                              clientPrice < driverPrice ? 'red' : '#D9ED92'
                            , fontWeight: '600', textShadow: '0px 0px 2px black'
                          }}>{driverPrice} KZT</h3>
                          </>
                        }
                          
                        </Col>
                        <Col md={12}>
                          <hr />
                        </Col>
                        <Col md={12} className="text-end">
                          <Button className="btn btn-primary"
                          onClick={handleShow}
                          style={{
                            border: '1px solid #34A0A4',
                            background: 'transparent', color: '#34A0A4'
                          }}>Басқа жүргізушіні таңдау</Button>
                          {
                            status == 'Тапсырыс орындалуда' ? 
                            <Button className="btn btn-primary"
                          onClick={() => {closeProject()}}
                          disabled={ driverPrice == 0 }
                          style={{
                            border: '1px solid #34A0A4',
                            background: '#34A0A4', color: 'white'
                          }}>{ driverPrice == 0 ? 'Күтілуде...' : 'Аяқтау'}</Button>
                          :
                          status == 'Тапсырыс аяқталды' ?
                          <Button className="btn btn-primary"
                          onClick={() => {handleCommentShow()}}
                          disabled={ driverPrice == 0 }
                          style={{
                            border: '1px solid #34A0A4',
                            background: '#34A0A4', color: 'white'
                          }}>{ driverPrice == 0 ? 'Күтілуде...' : 'Жеке пікір қалдыру'}</Button>
                          :
                          <Button className="btn btn-primary"
                          onClick={() => {setStatus()}}
                          disabled={ driverPrice == 0 }
                          style={{
                            border: '1px solid #34A0A4',
                            background: '#34A0A4', color: 'white'
                          }}>{ driverPrice == 0 ? 'Күтілуде...' : 'Шақыру'}</Button>
                          }
                        </Col>
                        
                      </Row>
                    </div>
                  </Col>
                </Row>


                <Row>
                  <Col className="col-auto ">
                    <span className="order-card-status">{status}</span>
                  </Col>
                  <Col>
                    <hr style={{ marginTop: "12px" }} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container>
            {/* <Row>
              <Col className="col-6 d-flex column align-items-center">
                <img width={"200px"} src={`http://localhost:5000${car_body.img}`} alt="" />
              </Col>
              <Col className="col-6 d-flex row align-items-end text-end">
                <p style={{ paddingRight: "0" }}>
                  {car_body.weight} кг дейін
                </p>
                <p style={{ paddingRight: "0" }}>
                  {car_body.size} м
                </p>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    paddingRight: "0",
                  }}
                >
                  {car_body.price} тнг
                </p>
              </Col>
            </Row> */}
          </Container>

          <Container>
            <Row>
              <Col className="d-flex">
                <hr />
                <img
                  className="order-img img-fluid flex-fill cover"
                  onClick={() => window.location.assign(`http://localhost:5000${img && img}`)}
                  style={{
                    maxHeight: '260px'
                  }}
                  src={`http://localhost:5000${img}`} alt="" />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Көлікті таңдау</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {

              cars?.map((cr, i) => cr?._id != car?._id && (
                <CarBody
                  id={cr?._id}
                  title={cr?.brand}
                  model={cr?.model}
                  number={cr?.number}
                  color={cr?.color}
                  body={cr?.body}
                  rating={cr?.rating}
                  driver={cr?.driver && cr?.driver}
                  img={`http://localhost:5000${cr?.img}`}
                  
                  select={() => handleSelectCar(cr)} />))
            }

          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Жабу
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={selectedCarShow} onHide={handleSelectedCarClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{
            cars?.map((car, i) => car?.brand == selectedCar?.brand && (
              <p style={{ color: 'black' }}>{car?.color} {car?.brand} {car?.model}</p>
            ))
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          {
              cars?.map((car, i) => car?.brand == selectedCar?.brand && (<>
                <img src={`http://localhost:5000${car?.img}`} width={'auto'} alt="" />
                <Row style={{ margin: '24px auto' }}>
                  <Col md={4}>

                    <img src={`http://localhost:5000${car?.driver?.avatar}`} width={'100px'} height={'100px'} style={{
                      border: '1px solid',
                      borderRadius: '50%'
                    }} alt="" />

                  </Col>
                  <Col md={8}>
                    <h6>{car?.driver?.name}</h6>
                    <h6>{car?.driver?.phone}</h6>
                    <h6>{car?.number}</h6>
                    <Rating size={30} readonly initialValue={car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length} /> &nbsp;
                    <span style={{
                      fontSize: '18px'
                    }}>{car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length}</span>
                  </Col>

                </Row>
                <hr />
                    <input type="number" onChange={event => setPrice(event.target.value)} className="form-control" placeholder="Енгізіңіз" />
              </>
              ))
             }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => {
            selectOtherDriver()
            handleSelectedCarClose()
            
          }} 
          style={{border: '1px solid', background: '#34A0A4', color: 'white'}}>
            Баға ұсыну
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={commentShow} onHide={handleCommentClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{
            cars?.map((car, i) => car?.brand == selectedCar && (
              <p style={{ color: 'black' }}>{car?.color} {car?.brand} {car?.model}</p>
            ))
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          {
              cars?.map((car, i) => car?.brand == selectedCar && (<>

                {/* <img src={`http://localhost:5000${car?.img}`} height={'100px'}  alt="" /> */}

                <Row style={{ margin: '24px auto' }}>
                  <Col md={4}>

                    <img src={`http://localhost:5000${car?.driver?.avatar}`} width={'100px'} height={'100px'} style={{
                      border: '1px solid',
                      borderRadius: '50%'
                    }} alt="" />

                  </Col>
                  <Col md={8} className="d-flex row align-items-center">
                    <h6>{car?.driver?.name}</h6>
                    <h6>{car?.driver?.phone}</h6>
                    <h6>{car?.number}</h6>
                    {/* <Rating size={30} readonly initialValue={car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length} /> &nbsp;
                    <span style={{
                      fontSize: '18px'
                    }}>{car?.rating?.reduce((a, b) => a + b, 0) / car?.rating?.length}</span> */}
                  </Col>

                </Row>
                <hr />
                    <textarea  rows={5} onChange={event => setComment(event.target.value)} className="form-control" placeholder="Пікір жазыңыз" />
                    <hr />
                    <span>
                      <Rating size={30} onClick={handleRating} />&nbsp; <span style={{fontSize: '16px'}}>{rating && rating}</span>
                    </span>
              </>
              ))
             }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => {
            createComment()
            handleCommentClose()
          }}
          style={{border: '1px solid', background: '#34A0A4', color: 'white'}}>
            Пікір қалдыру
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderA;
