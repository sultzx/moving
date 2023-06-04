import React from "react";
import {
  Tab,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchRegister, selectIsAuth } from "../redux/slices/auth.js";
import "../styles/Registration.scss";

const RegistrationForEmp = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [matchedPass, setMatchedPass] = React.useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      company: "",
      password: "",
      confirmPass: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    console.log(values);
    if (values.password === values.confirmPass) {
      const data = await dispatch(
        fetchRegister({
          username: values.username,
          email: values.email,
          company: values.company,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } else {
      setMatchedPass(false);
    }
  };

  if (isAuth) {
    window.location.assign(`http://localhost:3000/profile`)
  }

  return (
    <>
      <Container style={{ zIndex: "2" }}>
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

        {(errors && errors.username) ||
        errors.email ||
        errors.company ||
        errors.password ||
        errors.confirmPass ? (
          <Alert
            className="alert"
            variant={errors && errors && "danger"}
            style={{ borderColor: "red", borderRadius: "6px" }}
          >
            {errors && errors.username && (
              <>
                {errors.username?.message}
                <br />
              </>
            )}
            {errors && errors.email && (
              <>
                {errors.email?.message}
                <br />
              </>
            )}
            {errors && errors.company && (
              <>
                {errors.company?.message}
                <br />
              </>
            )}
            {errors && errors.password && (
              <>
                {errors.password?.message}
                <br />
              </>
            )}
            {errors && errors.confirmPass && (
              <>
                {errors.confirmPass?.message}
                <br />
              </>
            )}
            {!matchedPass && "Құпия сөздер сәйкес келмейді"}
          </Alert>
        ) : (
          ""
        )}
        <Row>
          <Col className="col-12 d-flex align-items-center justify-content-center">
            <Card className="registration-card text-center" sticky="top">
              <Card.Body>
                <Tab.Container defaultActiveKey={"second"}>
                  <Card.Title>{"Регистрация"}</Card.Title>
                  <Nav variant="pills" className="flex-column">
                    <Row>
                      <Col className="d-flex column justify-content-center align-items-center">
                        <Nav.Item className="flex-fill">
                          <Link
                            style={{ textDecoration: "none", color: "#FB8500" }}
                            to={"../registration"}
                          >
                            <Nav.Link
                              href="/registration"
                              className="switch-nav-link"
                              eventKey="first"
                            >
                              Клиент
                            </Nav.Link>
                          </Link>
                        </Nav.Item>
                      </Col>
                      <Col className="d-flex column justify-content-center align-items-center">
                        <Nav.Item className="flex-fill">
                          <Nav.Link
                            className="switch-nav-link"
                            eventKey="second"
                          >
                            Қызметкер
                          </Nav.Link>
                        </Nav.Item>
                      </Col>
                    </Row>
                  </Nav>
                  <hr />
                  <Row className="text-start">
                    <Form onSubmit={handleSubmit(onSubmit)} method="post">
                      <Form.Group className="mb-3">
                        <Form.Label>Қолданушы аты</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.username?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#FB8500" }
                          }
                          className="form-control-input"
                          {...register("username", {
                            required: "Қолданушы атын енгізіңіз",
                            minLength: {
                              value: 3,
                              message:
                                "Атыңыз 3 және 16 символ арасында болуы керек",
                            },
                            maxLength: {
                              value: 16,
                              message:
                                "Атыңыз 3 және 16 символ арасында болуы керек",
                            },
                          })}
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Пошта</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.email?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#FB8500" }
                          }
                          className="form-control-input"
                          {...register("email", {
                            required: "Поштаңызды енгізіңіз",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Дұрыс форматты енгізіңіз",
                            },
                          })}
                          type="email"
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Компания</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.company?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#FB8500" }
                          }
                          className="form-control-input"
                          {...register("company", {
                            required: "Компания атын енгізіңіз",
                            minLength: {
                              value: 3,
                              message: "Компания 3 символдан кем болмау керек",
                            },
                          })}
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Құпия сөз</Form.Label>
                        <Form.Control
                          className="form-control-input"
                          style={
                            Boolean(errors.password?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#FB8500" }
                          }
                          {...register("password", {
                            required: "Құпия сөзді енгізіңіз",
                            minLength: {
                              value: 6,
                              message:
                                "Құпия сөз 6 және 16 символ арасында болуы керек",
                            },
                            maxLength: {
                              value: 16,
                              message:
                                "Атыңыз 6 және 16 символ арасында болуы керек",
                            },
                          })}
                          type="password"
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Құпия сөзді қайталаңыз</Form.Label>
                        <Form.Control
                          className="form-control-input"
                          style={
                            Boolean(errors.confirmPass?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#FB8500" }
                          }
                          {...register("confirmPass", {
                            required: "Құпия сөзді қайта енгізіңіз",
                            validate: (val) => {
                              if (watch("password") !== val) {
                                return "Құпия сөздер сәйкес келмейді";
                              }
                            },
                          })}
                          type="password"
                          placeholder=""
                        />
                      </Form.Group>

                      <Col className="col-12 d-flex column justify-content-end align-items-center">
                        <Link to="/login">
                          <Button
                            variant="primary"
                            className="switch-to-client-outline-btn"
                          >
                            Кіру бөліміне өту
                          </Button>
                        </Link>

                        <Button
                          disabled={!isValid}
                          variant="primary"
                          className=""
                          type="submit"
                        >
                          Тіркелу
                        </Button>
                      </Col>
                    </Form>
                  </Row>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForEmp;
