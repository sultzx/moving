import React from "react";

import {
  Tab,
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
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";

import "../styles/Login.scss";

const Login = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    setErrorMessage(data.payload.message);

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
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

        {errors && (errors.login || errors.password) ? (
          <Alert
            className="alert"
            variant={errors && errors && "danger"}
            style={{ borderColor: "red", borderRadius: "6px", textAlign: 'center' }}>
            {errors && errors.login && (
              <>
                {errors.login?.message}
                <br />
              </>
            )}
            {errors && errors.password && (
              <>
                {errors.password?.message}
                <br />
              </>
            )}
          </Alert>
        ) : (
          ""
        )}

        <Row>
          <Col className="col-12 d-flex align-items-center justify-content-center">
            <Card className="login-card text-center">
              <Card.Body>
                <Tab.Container defaultActiveKey={"first"}>
                  <Card.Title>{"Кіру"}</Card.Title>
                  <Row className="text-start">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3">
                        <Form.Label>Қолданушы аты немесе пошта</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.login?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#52B69A" }
                          }
                          className="form-control-input"
                          {...register("login", {
                            required: "Қолданушы атын немесе поштаны енгізіңіз",
                            minLength: {
                              value: 3,
                              message:
                                "Қолданушы атын немесе пошта 3 символдан кем болмауы керек",
                            },
                          })}
                          placeholder=""
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Құпия сөз</Form.Label>
                        <Form.Control
                          style={
                            Boolean(errors.password?.message)
                              ? {
                                  borderColor: "red",
                                  background: "rgba(255, 0, 0, 0.122)",
                                }
                              : { borderColor: "#52B69A" }
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
                          className="form-control-input"
                          type="password"
                          placeholder=""
                        />
                      </Form.Group>

                      <Col className="col-12 d-flex column justify-content-end align-items-center">
                        <Link to="/registration">
                          <Button
                            variant="primary"
                            className="switch-to-client-outline-btn"
                          >
                            Тіркелу бөліміне өту
                          </Button>
                        </Link>
                        <Button
                          disabled={!isValid}
                          variant="primary"
                          className=""
                          type="submit"
                        >
                          Кіру
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

export default Login;
