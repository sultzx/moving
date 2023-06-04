import React from "react";
import { Container, Row, Col, Button, Card, Form, Alert, Modal } from "react-bootstrap";

import Order from "../components/Order/OrderA"
import "../styles/Orders.scss"
import { useDispatch, useSelector } from "react-redux"
import { ffetchGetAllOrders } from "../redux/slices/order.js"
import { fetchGetAllComments } from "../redux/slices/comment.js";
import { fetchGetAllCars } from "../redux/slices/auth";
import { Rating } from 'react-simple-star-rating'
import CarBody from "../components/CarBody/CarBody";
import { useParams } from "react-router-dom";

const Comments = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const userData = useSelector((state) => state.auth.data);

    console.log(id)


    React.useEffect( () => {
        dispatch(fetchGetAllCars())
        dispatch(fetchGetAllComments())
    }, [])

    const sortedCar = []

    const cars = useSelector(state => state.auth.cars.items);
    const { items } = useSelector(state => state.comment);


    /////////////////////////////////////////////////////////////

    cars?.forEach(cr => {
        if (cr?._id == id) {
            sortedCar.push(cr)
        }
    })

    //////////////////////////////////////////////////////////

    const [responseMessage, setResponseMessage] = React.useState('');

    const handleGetResponse = (response) => {
        setResponseMessage(response)
    }
    console.log('items', items && items)



    return (
        <>
            <Container>
                {responseMessage && responseMessage && (
                    <Alert
                        className="alert"
                        variant={responseMessage && responseMessage ? "danger" : "primary"}
                        style={
                            responseMessage && responseMessage
                                ? { borderColor: "red" }
                                : { borderRadius: "6px" }
                        }
                    >
                        {
                            <div className="text-center" style={{ margin: "-12px" }}>
                                {responseMessage && <span>{responseMessage}</span>}
                            </div>
                        }
                    </Alert>
                )}
                <br />
                <Row>
                    <h3>{sortedCar[0]?.color} {sortedCar[0]?.brand} {sortedCar[0]?.model} - {sortedCar[0]?.number} <img src={`http://localhost:5000${sortedCar[0]?.img}`} alt="" /></h3>
                    <hr />

                    <span>
                        <img src={`http://localhost:5000${sortedCar[0]?.driver?.avatar}`} style={{
                            width: '100px',
                            height: '100px',
                            border: '1px solid',
                            borderRadius: '12px',
                            margin: '12px 12px 12px 0'
                        }} alt="" />
                        {`${sortedCar[0]?.driver?.name} - ${sortedCar[0]?.driver?.phone}`}
                    </span>
                    <hr />
                </Row>
                <Row>
                    {items?.map((map, i) => (
                        <Col md={4}>
                            <div style={{
                                border: '1px solid #52B69A',
                                borderRadius: '12px',
                                padding: '12px',
                                boxShadow: '1px 1px 10px #41AAA0'
                                }}>
                            <Row>
                                <Col md={3}>
                                    <img src={`http://localhost:5000${map?.creator?.avatar}`} style={{border: '1px solid', borderRadius: '8px', width: '80px', height: '80px'}}  alt="" />
                                </Col>
                                <Col md={'9'} className="d-flex row align-items-center">
                                    <h6>{map?.creator?.name}</h6>
                                    <h6>{map?.creator?.email}</h6>
                                    <h6>{map?.creator?.phone}</h6>
                                </Col>
                                <Col md={12}>
                                    <hr />
                                </Col>
                                <Col md={12}>
                                    <span>Бағасы: &nbsp; <Rating size={'28'} initialValue={map?.rating}  readonly /> &nbsp; {map?.rating}</span>
                                    <p style={{color: 'black'}}>Комментарий: &nbsp; {map?.comment}</p>
                                </Col>
                                <Col md={12}>
                                    <hr />
                                </Col>
                                <Col md={12}>
                                    <p style={{color: 'black'}} className="text-end">{new Date (map?.createdAt).toLocaleString('kk-KZ')}</p>
                                </Col>
                            </Row>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Comments;
