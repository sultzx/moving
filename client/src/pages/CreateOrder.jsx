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
import { fetchAuthMe, fetchGetAllCars } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

import CarBody from "../components/CarBody/CarBody";
import { fetchCreateOrder } from "../redux/slices/order";

import { Rating } from 'react-simple-star-rating'

const CreateOrder = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const inputFileRef = React.useRef(null);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [selectedCar, setSelectedCar] = React.useState("");

  const [orderImgUrl, setOrderImgUrl] = React.useState("");

  const [category, setCategory] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState("");

  const [price, setPrice] = React.useState()

  const [show, setShow] = React.useState(false);

  const [selectedCarShow, setSelectedCarShow] = React.useState(false)

  const userData = useSelector((state) => state.auth.data);

  const cars = useSelector(state => state.auth.cars.items);

  React.useEffect(() => {
    dispatch(fetchGetAllCars())
  }, [])

  console.log(cars && cars)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectedCarClose = () => setSelectedCarShow(false);
  const handleSelectedCarShow = () => setSelectedCarShow(true);

  const categoryOptions = [
    { value: "0", text: "Категорияны таңдаңыз" },
    { value: "1", text: "Қала ішінде тасымалдау" },
    { value: "2", text: "Қалааралық тасымалдау" },
  ];

  const datetimeOptions = [
    { value: "0", text: "Уақытты таңдаңыз" },
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
      setOrderImgUrl(
        data && data.url
      );
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
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const [allNotValid, setAllNotValid] = React.useState (
        (category == "Категорияны таңдаңыз") ||
    (selectedDate == "Уақытты таңдаңыз") ||
    (selectedCar == "") ||
    (orderImgUrl == "")
  )


  console.log(Boolean(allNotValid))

  const onSubmit = async (values) => {


      const data = await dispatch(fetchCreateOrder({
        title: values.title,
        description: values.description,
        category: category && category,
        datetime: selectedDate && selectedDate,
        price: price && price,
        car: selectedCar && selectedCar,
        img: orderImgUrl && orderImgUrl,
      }));

      alert(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
      dispatch(fetchAuthMe());

      navigate('/orders')

  };

  console.log(selectedDate, category);

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

        {errors &&
          errors.title ||
          errors.description ? (
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
          <h3>Тапсырыс жасау</h3>
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
                                      : { borderColor: "#34A0A4" }
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
                                  placeholder=""
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
                                      : { borderColor: "#34A0A4" }
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
                                  placeholder=""
                                />
                              </Form.Group>
                            </Col>

                            <Col lg={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Категория</Form.Label>
                                <Form.Select
                                  selected={category}
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
                                      style={{
                                        borderColor: '#34A0A4'
                                      }}
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
                                  style={{ margin: "0 12px 0 12px", borderColor: '#34A0A4', color: '#34A0A4' }}
                                >
                                  {
                                    cars?.map((car, i) => car?._id == selectedCar ? (
                                        <>{car?.color} {car?.brand} {car?.model} {car?.number}</>
                                    ): "Таңдаңыз")}
                                    
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
                                      : altImage
                                  }
                                  alt=""
                                  style={{
                                    borderColor: '#34A0A4'
                                  }}
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
                        >
                          Бас тарту
                        </Button>
                        <Button
                          disabled={!isValid}
                          variant="primary"
                          className=""
                          type="submit">
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
                  select={() => handleSelectCar(car?._id)} />))
            }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Жабу
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={selectedCarShow} onHide={handleSelectedCarClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>{
            cars?.map((car, i) => car?._id == selectedCar && (
              <p style={{ color: 'black' }}>{car?.color} {car?.brand} {car?.model}</p>
            ))
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {
              cars?.map((car, i) => car?._id == selectedCar && (<>
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
          <Button variant="primary" onClick={handleSelectedCarClose}
          style={{border: '1px solid', background: '#34A0A4', color: 'white'}}
            >
            Баға ұсыну
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateOrder;
