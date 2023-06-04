import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";

import "../styles/CreateOrder.scss";
import { Box2Fill } from "react-bootstrap-icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import axios from "../axios.js";
import one from "../images/1.png";
import two from "../images/2.png";
import three from "../images/3.png";
import four from "../images/4.png";
import five from "../images/5.png";
import six from "../images/6.png";
import seven from "../images/7.png";
import CarBody from "../components/CarBody/CarBody";
import { Rating } from 'react-simple-star-rating'

import { fetchAuthMe, fetchGetAllCars } from "../redux/slices/auth";
import { fetchGetAllOrders, fetchUpdateOrder } from "../redux/slices/order";

const UpdateOrder = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const inputFileRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(fetchGetAllOrders());
    dispatch(fetchGetAllCars())
  }, []);

  const currentOrder = [];

  const { orders } = useSelector((state) => state.orders);
  const cars = useSelector(state => state.auth.cars.items);

  orders &&
    orders.items &&
    orders.items.forEach((item, i) => {
      if (item._id == id) {
        currentOrder.push(item);
      }
    }, []);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [selectedCar, setSelectedCar] = React.useState(
    currentOrder && currentOrder[0] && currentOrder[0].car.brand
  );

  const [orderImgUrl, setOrderImgUrl] = React.useState(
    currentOrder && currentOrder[0] && currentOrder[0].img
  );

  const [category, setCategory] = React.useState();

  const [selectedDate, setSelectedDate] = React.useState("");

  const [price, setPrice] = React.useState( currentOrder && currentOrder[0] && currentOrder[0].clientPrice)

  const [show, setShow] = React.useState(false);

  const [selectedCarShow, setSelectedCarShow] = React.useState(false)

  const [c_number, setC_number] = React.useState("");

console.log(cars && cars)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectedCarClose = () => setSelectedCarShow(false);
  const handleSelectedCarShow = () => setSelectedCarShow(true);

  const categoryOptions = [
    { value: "0", text: `Таңдалған категория: ${currentOrder && currentOrder[0] && currentOrder[0].category}` },
    { value: "1", text: "Қала ішінде тасымалдау" },
    { value: "2", text: "Қалааралық тасымалдау" },
  ];

  const datetimeOptions = [
    { value: "0", text: `Таңдалған уақыт: ${currentOrder && currentOrder[0] && currentOrder[0].datetime}` },
    { value: "1", text: "Бүгін" },
    { value: "2", text: "Ертең" },
    { value: "3", text: "Осы апта" },
    { value: "4", text: "Мүмкіндігінше тез" },
  ];

  const handleCategoryChange = (event) => {
    setCategory(categoryOptions[event.target.value].text);
  };

  const handleSelectCar = (data) => {
    setSelectedCar(data);
    handleClose();
    handleSelectedCarShow()
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/order", formData);
      setOrderImgUrl(data && data.url);
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: currentOrder && currentOrder[0] && currentOrder[0].title,
      description:
        currentOrder && currentOrder[0] && currentOrder[0].description,
    },
    mode: "onChange",
  });

  const [allNotValid, setAllNotValid] =
    React.useState(category == "Категорияны таңдаңыз") ||
    selectedDate == "Уақытты таңдаңыз" ||
    selectedCar == "Таңдаңыз" ||
    orderImgUrl == "";

console.log(selectedCar && selectedCar)

  const onSubmit = async (values) => {

    const selectedCarId = []

    cars?.forEach((car) => { 
      if (car?.brand == selectedCar?.brand) {
        selectedCarId.push(car?._id) 
      }
    })
    
    if (allNotValid) {
      setErrorMessage("Форманы дұрыс толтырыңыз");
    } else {
      const data = await dispatch(
        fetchUpdateOrder({
          id: id,
          title: values.title,
          description: values.description,
          category: category && category,
          price: price && price,
          datetime: selectedDate && selectedDate,
          car: selectedCarId[0],
          img: orderImgUrl && orderImgUrl,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
      dispatch(fetchAuthMe());

      navigate("/orders");
    }
  };

React.useEffect(() => {
    categoryOptions.forEach((option, i) => {
      if (
        option.text ==
        (currentOrder &&
          currentOrder[0] &&
          currentOrder[0].category &&
          currentOrder[0].category)
      ) {
        setC_number(option.value);
      }
    });
}, [])



  console.log(c_number && c_number, "c n");

  const altImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  return (
    <>
      <Container>
        {errorMessage && errorMessage && (
          <Alert
            className="alert"
            variant={errorMessage && errorMessage ? "danger" : "primary"}
            style={
              errorMessage && errorMessage
                ? { borderColor: "red" }
                : { borderRadius: "6px" }
            }
          >
            {
              <div className="text-center" style={{ margin: "-12px" }}>
                {errorMessage && <span>{errorMessage}</span>}
              </div>
            }
          </Alert>
        )}

        {(errors && errors.title) || errors.description ? (
          <Alert
            className="alert"
            variant={errors && errors && "danger"}
            style={{ borderColor: "red", borderRadius: "6px" }}
          >
            {errors && errors.title && (
              <>
                {errors.title?.message}
                <br />
              </>
            )}
            {errors && errors.description && (
              <>
                {errors.description?.message}
                <br />
              </>
            )}
          </Alert>
        ) : (
          ""
        )}

        <br />
        <Row>
          <h3>Тапсырыс жаңарту</h3>
          <Col className="col-12" style={{ paddingTop: "18px" }}>
            <Card className="profile-card">
              <Card.Body>
                <span className="card-title">Тапсырыс панелі</span>
                <Row>
                  <Col className="col-xs-12 ">
                    <hr />
                    <Form onSubmit={handleSubmit(onSubmit)} method="post">
                      <Row>
                        <Col lg={6}>
                          <Row>
                            <Col lg={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Тапсырыс атауы</Form.Label>
                                <Form.Control
                                  style={
                                    Boolean(errors.title?.message)
                                      ? {
                                          borderColor: "red",
                                          background: "rgba(255, 0, 0, 0.122)",
                                        }
                                      : { borderColor: "#FB8500" }
                                  }
                                  {...register("title", {
                                    required: "Тапсырыс атауын енгізіңіз",
                                    minLength: {
                                      value: 3,
                                      message:
                                        "Тапсырыс атауы 3 символдан кем болмауы керек",
                                    },
                                  })}
                                  className="form-control-input"
                                  type="text"
                                  placeholder={
                                    currentOrder &&
                                    currentOrder[0] &&
                                    currentOrder[0].title
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Тапсырыс сипаттамасы</Form.Label>
                                <Form.Control
                                  style={
                                    Boolean(errors.description?.message)
                                      ? {
                                          borderColor: "red",
                                          background: "rgba(255, 0, 0, 0.122)",
                                        }
                                      : { borderColor: "#FB8500" }
                                  }
                                  {...register("description", {
                                    required: "Тапсырыс сипаттамасын енгізіңіз",
                                    minLength: {
                                      value: 3,
                                      message:
                                        "Тапсырыс сипаттамасы 3 символдан кем болмауы керек",
                                    },
                                  })}
                                  className="form-control-input"
                                  type="text"
                                  placeholder={
                                    currentOrder &&
                                    currentOrder[0] &&
                                    currentOrder[0].description
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col lg={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Категория</Form.Label>
                                <Form.Select
                                  onChange={handleCategoryChange}
                                  className="form-control-input"
                                >
                                  {categoryOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.text}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>

                            <Col lg={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Күні мен уақыты</Form.Label>
                                <Row>
                                  <Col lg={7} xs={12} sm={12} md={7}>
                                    <Form.Select
                                      onMouseDown={() => setSelectedDate("")}
                                      onChange={(event) =>
                                        setSelectedDate(
                                          datetimeOptions[event.target.value]
                                            .text
                                        )
                                      }
                                      className="form-control-input"
                                    >
                                      {datetimeOptions.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {selectedDate && selectedDate
                                            ? selectedDate
                                            : option.text}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                  <Col
                                    lg={1}
                                    xs={12}
                                    sm={12}
                                    md={1}
                                    className="d-flex align-items-center"
                                  >
                                    <hr style={{ color: "black" }} />
                                  </Col>
                                  <Col
                                    lg={4}
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    className="d-flex"
                                  >
                                    <input
                                      ref={inputFileRef}
                                      defaultValue="asd"
                                      className="order-select-date flex-fill"
                                      type="date"
                                      onChange={(event) => {
                                        setSelectedDate(
                                          new Date(
                                            event.target.value
                                          ).toLocaleDateString("kk-KZ", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })
                                        );
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Form.Group>
                            </Col>
                            <Col lg={12}>
                              <Form.Group className="mb-3 d-flex row justify-content-center align-items-center">
                                <Form.Label>Көлік</Form.Label>
                                <Button
                                  onClick={handleShow}
                                  className="choose-car-body-btn flex-fill"
                                  style={{ margin: "0 12px 0 12px" }}
                                >

                                  {selectedCar
                                    ? <>{selectedCar?.color} {selectedCar?.brand} {selectedCar?.model} {selectedCar?.number}</>
                                    : currentOrder &&
                                      currentOrder[0] &&
                                      currentOrder[0].car.brand
                                    ? <>{currentOrder[0].car.color} {currentOrder[0].car.brand} {currentOrder[0].car.model} {currentOrder[0].car.number}</> 
                                    : "Таңдаңыз"}
                                  &nbsp;
                                  <Box2Fill />
                                </Button>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <Col lg={12}>
                            <Form.Group className="mb-3 d-flex row align-items-center justify-content-center">
                              <Form.Label>Бейнесі</Form.Label>
                              <Row>
                                <img
                                  className="order-img img-fluid full"
                                  src={
                                    orderImgUrl && orderImgUrl
                                      ? `http://localhost:5000${orderImgUrl}`
                                      : currentOrder &&
                                        currentOrder[0] &&
                                        currentOrder[0].img
                                      ? `http://localhost:5000${currentOrder[0].img}`
                                      : altImage
                                  }
                                  alt=""
                                  onClick={() => {
                                    inputFileRef.current.click();
                                  }}
                                />
                                <input
                                  type="file"
                                  ref={inputFileRef}
                                  onChange={handleChangeFile}
                                  hidden
                                />
                              </Row>
                            </Form.Group>
                          </Col>
                        </Col>
                      </Row>

                      <hr />
                      <Row>
                        <Col md={12} >
                          <h3 style={{color: 'white'}}>
                            Cіз ұсынған баға: {price && price} тнг
                          </h3>
                          
                        </Col>
                      </Row>
                      <hr />
                      <Col className="col-12 d-flex column justify-content-end align-items-center">
                        <Button
                          variant="primary"
                          className="switch-to-client-outline-btn"
                          onClick={() => {window.location.assign(`http://localhost:3000/orders`)}}
                        >
                          Бас тарту
                        </Button>
                        <Button
                          disabled={!isValid}
                          variant="primary"
                          className=""
                          type="submit"
                        >
                          Сақтау
                        </Button>
                      </Col>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Көлікті таңдау</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {

              cars?.map((car, i) => (
                <CarBody
                  title={car?.brand}
                  model={car?.model}
                  number={car?.number}
                  color={car?.color}
                  body={car?.body}
                  rating={car?.rating}
                  driver={car?.driver && car?.driver}
                  img={`http://localhost:5000${car?.img}`}
                  select={() => handleSelectCar(car)} />))
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
          <Button variant="secondary"  onClick={handleSelectedCarClose}>
            Жабу
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateOrder;
