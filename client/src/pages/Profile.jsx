import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "../axios.js";
import { Rating } from 'react-simple-star-rating'

import {
  selectIsAuth,
  fetchUpdateMe,
  fetchUpdateCar,
  fetchGetOneCars,
  fetchAuthMe,
} from "../redux/slices/auth.js";

import "../styles/Profile.scss";

const Profile = () => {

  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const myCar = useSelector(state => state.auth.cars)

  React.useEffect(() => {
     dispatch(fetchGetOneCars())
  }, [])

  console.log(myCar?.data?.[0]?.brand)

  const inputFileRef = React.useRef(null);

  const isEmployee = userData && userData.role == "employee";

  const [brand, setBrand] = React.useState(myCar?.data?.[0]?.brand)

  const [model, setModel] = React.useState()

  const [carImg, setCarImg] = React.useState(`http://localhost:5000${myCar?.data?.[0]?.img}`)

  const [number, setNumber] = React.useState()

  const [color, setColor] = React.useState()

  const [body, setBody] = React.useState()

  console.log(myCar?.data?.[0])

  const colorOptions = [
    { value: "0", text: "-- Көлік түсін таңдаңыз --" },
    { value: "1", text: "Қызыл" },
    { value: "2", text: "Сарығыш" },
    { value: "3", text: "Сары" },
    { value: "4", text: "Жасыл" },
    { value: "5", text: "Көк" },
    { value: "6", text: "Қоңыр" },
    { value: "7", text: "Қара" },
    { value: "8", text: "Ақ" },
  ];

  const bodyOptions = [
    { value: "0", text: "-- Кузовты таңдаңыз --" },
    { value: "1", text: "Седан" },
    { value: "2", text: "Кроссовер" },
    { value: "3", text: "Хэтчбек" },
    { value: "4", text: "Универсал" },
    { value: "5", text: "Купе" },
    { value: "6", text: "Минивен" },
    { value: "7", text: "Фургон" },
  ];

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/avatar", formData);
      console.log(data.url);
      console.log("asdasd");
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  const handleSelectCar = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/cars", formData);
      console.log();
      setCarImg(data.url)
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: userData && userData.name && userData.name,
      phone: userData && userData.phone && userData.phone,
      addressOrCompany:
        userData && userData.role == "user"
          ? userData && userData.address
          : userData && userData.company,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(
      fetchUpdateMe({
        name: values.name,
        phone: values.phone,
        addressOrCompany: values.addressOrCompany,
      })
    );

    setErrorMessage(data.payload.message);

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    dispatch(fetchAuthMe());
  };

  const updateCar = async () => {
      await dispatch(fetchUpdateCar({
        brand: brand && brand, model: model && model, number: number && number, color: color && color, body: body && body
      }))
  }

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

        {(errors && errors.name) || errors.phone || errors.addressOrCompany ? (
          <Alert
            className="alert"
            variant={errors && errors && "danger"}
            style={{ borderColor: "red", borderRadius: "6px" }}
          >
            {errors && errors.name && (
              <>
                {errors.name?.message}
                <br />
              </>
            )}
            {errors && errors.phone && (
              <>
                {errors.phone?.message}
                <br />
              </>
            )}
            {errors && errors.addressOrCompany && (
              <>
                {errors.addressOrCompany?.message}
                <br />
              </>
            )}
          </Alert>
        ) : (
          ""
        )}
        <br />
        <Row>
          <h3>
            {isEmployee
              ? "Қызметкердің жеке профилі"
              : "Клиенттің жеке профилі"}
          </h3>
        </Row>
        <hr />
        <br />
        <Row>
          <Col className="col-12">
            <Card className="profile-card">
              <Card.Body>
                <Card.Title>Жеке ақпарат</Card.Title>
                <Row>
                  <Col className="col-lg-2 col-xs-12 text-center d-flex column align-items-lg-end">
                    <img
                      className="profile-avatar"
                      onClick={() => {
                        inputFileRef.current.click();
                      }}
                      src={`http://localhost:5000${userData && userData.avatar && userData.avatar
                        }`}
                      alt=""
                    />
                    <input
                      type="file"
                      ref={inputFileRef}
                      onChange={handleChangeFile}
                      hidden
                    />
                  </Col>
                  <Col className="col-xs-12 ">
                    <h3 className="client-fullname"> {userData && userData.username && userData.username} </h3>
                    <hr />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col lg={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Аты-жөніңіз</Form.Label>
                            <Form.Control
                              style={
                                Boolean(errors.name?.message)
                                  ? {
                                    borderColor: "red",
                                    background: "rgba(255, 0, 0, 0.122)",
                                  }
                                  : { borderColor: "#52B69A" }
                              }
                              {...register("name", {
                                required: "Аты-жөніңізды енгізіңіз",
                                minLength: {
                                  value: 3,
                                  message:
                                    "Аты-жөніңіз 3 символдан кем болмауы керек",
                                },
                              })}
                              className="form-control-input"
                              type="text"
                              placeholder={`${userData && userData.name && userData.name
                                  ? userData.name
                                  : ""
                                }`}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Телефон нөміріңіз</Form.Label>
                            <Form.Control
                              style={
                                Boolean(errors.phone?.message)
                                  ? {
                                    borderColor: "red",
                                    background: "rgba(255, 0, 0, 0.122)",
                                  }
                                  : { borderColor: "#52B69A" }
                              }
                              {...register("phone", {
                                required: "Телефон нөміріңізді енгізіңіз",
                                minLength: {
                                  value: 11,
                                  message:
                                    "Телефон нөміріңіз 11 символдан тұруыңыз керек",
                                },
                              })}
                              className="form-control-input"
                              type="text"
                              placeholder={`${userData && userData.phone && userData.phone
                                  ? userData.phone
                                  : ""
                                }`}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              {isEmployee ? "Компания" : "Мекен-жайыңыз"}
                            </Form.Label>
                            <Form.Control
                              style={
                                Boolean(errors.addressOrCompany?.message)
                                  ? {
                                    borderColor: "red",
                                    background: "rgba(255, 0, 0, 0.122)",
                                  }
                                  : { borderColor: "#52B69A" }
                              }
                              {...register("addressOrCompany", {
                                required: `${isEmployee
                                    ? "Компанияңызды"
                                    : "Мекен-жайыңызды"
                                  } енгізіңіз`,
                                minLength: {
                                  value: 3,
                                  message: `${isEmployee ? "Компанияңыз" : "Мекен-жайыңыз"
                                    } 3 символдан кем болмауы керек`,
                                },
                              })}
                              className="form-control-input"
                              placeholder={`${userData &&
                                  userData.role &&
                                  userData.role == "employee"
                                  ? userData &&
                                    userData.company &&
                                    userData.company
                                    ? userData.company
                                    : ""
                                  : userData &&
                                    userData.address &&
                                    userData.address
                                    ? userData.address
                                    : ""
                                }`}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Col className="col-12 d-flex column justify-content-end align-items-center">
                        <Button
                          variant="primary"
                          className=""
                          disabled={!isValid}
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
          <Col className="col-12">
            <br />
            {isEmployee ? (
              <>
                <Card className="profile-card">
                  <Card.Body>
                    <Card.Title>Жеке автокөлік мәліметі</Card.Title>

                    <Row>

                      <Col md={4}>
                        <label style={{ color: 'white' }}>
                          Маркасы
                        </label>
                        <input type="text" onChange={event => setBrand(event.target.value)} defaultValue={myCar?.data?.[0].brand} placeholder="Маркасын жазыңыз" className="form-control" />
                      </Col>

                      <Col md={4}>
                        <label style={{ color: 'white' }}>
                          Моделі
                        </label>
                        <input type="text" onChange={event => setModel(event.target.value)} defaultValue={myCar?.data?.[0].model} placeholder="Моделін жазыңыз" className="form-control" />
                      </Col>

                      <Col md={4}>
                        <label style={{ color: 'white' }}>
                          Нөмірі
                        </label>
                        <input type="text" onChange={event => setNumber(event.target.value)} defaultValue={myCar?.data?.[0].number} placeholder="Нөмірін жазыңыз" className="form-control" />
                      </Col>
                      <Col md={12} style={{margin: '8px auto'}}></Col>
                      <Col md={4}>
                        <label style={{ color: 'white' }}>
                          Көлік бейнесі
                        </label>
                        <input type="file" className="form-control" onChange={(event) => {handleSelectCar(event)}} />
                        <img src={myCar?.data?.[0]?.img ? `http://localhost:5000${myCar?.data?.[0]?.img}` : carImg ? `http://localhost:5000${carImg}` : '' } style={{
                          border: '1px solid',
                          borderRadius: '4px',
                          margin: '18px auto'
                        }} height={'200px'} className="img-fluid" width={'300px'} />
                      </Col>

                      <Col md={4}>
                        <label style={{ color: 'white' }} >
                          Кузовы - {myCar?.data?.[0].body}
                        </label>
                        <Form.Select
                          selected={body}
                          onChange={event => setBody(bodyOptions[event.target.value].text)}
                          className="form-control select-input"
                        >
                          {bodyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <label style={{ color: 'white' }}>
                          Түсі - {myCar?.data?.[0].color}
                        </label>
                        <Form.Select
                          selected={color}
                          onChange={event => setColor(colorOptions[event.target.value].text)}
                          className="form-control select-input">
                          {colorOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>

                      <Col md={12}>
                            <label style={{color: 'white'}}>
                              Жүргізуші жеке рейтингі
                            </label>
                            <hr />
                            <Rating
                              readonly
                              initialValue={myCar?.data?.[0]?.rating}/>
                            <hr />
                      </Col>
                    </Row>
                    <Col className="col-12 d-flex column justify-content-end align-items-center">
                        <Button variant="primary" className="" onClick={updateCar} >
                          Сақтау
                        </Button>
                    </Col>
                  </Card.Body>
                </Card>
                <br />
                <Card className="profile-card">
                  <Card.Body>
                    <Card.Title>Тапсырыс орындау</Card.Title>
                    <Card.Text>
                      Жүйе ішінде тіркелген қызметкер клиенттердің тапсырысын
                      орындай алады. Ол үшін төмендегі "Тапсырыстар" батырмасын
                      басып, тізімдегі кез-келген тапсырысты орындай алады.
                    </Card.Text>
                    <Col className="col-12 d-flex column justify-content-end align-items-center">
                      <Link to={"../orders-for-employee"}>
                        <Button variant="primary" className="" type="submit">
                          Тапсырыстар
                        </Button>
                      </Link>
                    </Col>
                  </Card.Body>
                </Card>
              </>

            ) : (
              <Card className="profile-card">
                <Card.Body>
                  <Card.Title>Тапсырыс жасау</Card.Title>
                  <Card.Text>
                    Әрбір клиент өзінің тапсырысын осы панель ішінде бере алады.
                    Тапсырыс беру үшін "Тапсырыс қосу" батырмасын баса аласыз.
                    Барлық тапсырыстарыңызды көру үшін "Барлық тапсырыстар"
                    батырмысын басуыңызға болады
                  </Card.Text>
                  <Col className="col-12 d-flex column justify-content-end align-items-center">
                    <Link to={"../orders"}>
                      <Button
                        variant="primary"
                        className="switch-to-client-outline-btn"
                      >
                        Барлық тапсырмалар
                      </Button>
                    </Link>

                    <Link to={"../create-order"}>
                      <Button variant="primary" className="" type="submit">
                        Тапсырыс жасау
                      </Button>
                    </Link>
                  </Col>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
