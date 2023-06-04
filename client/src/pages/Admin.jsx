import React from "react";
import { Container, Row, Col, Button, Card, Form, Alert, Modal } from "react-bootstrap";

import Order from "../components/Order/OrderA"
import "../styles/Orders.scss"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetAllOrders } from "../redux/slices/order.js"
import { fetchGetAllCars } from "../redux/slices/auth";
import { Rating } from "react-simple-star-rating";

const Admin = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchGetAllOrders())

    }, [])

    const { orders } = useSelector((state) => state.orders);

    const [pass, setPass] = React.useState()

    const [isOpen, setIsOpen] = React.useState(false)

    console.log(orders && orders)

    const check = () => {
        if (pass && pass === 'Zxcv1234!@#') {
            alert('Құпиясөз дұрыс терілді. Қош келдіңіз!')
            setIsOpen(true)
        } else {
            alert('Құпиясөз қате терілген. Рұқсат жоқ!')
            setIsOpen(false)
        }
    }

    return (<>
        <Container fluid>
            <br />
            <Row>
                <h3>
                    Админ панелі
                    <hr />
                    <Col md={3}>
                    <input type="password" value={pass}  onChange={e => setPass(e.target.value)} className="form-control" placeholder="Админ панеліне кіру үшін құпия сөзді енгізіңіз" style={{border: '2px solid #4EB39B'}} />
                    
                    </Col>
                    <Col md={'auto'}><Button className="btn btn-primary" onClick={check} style={{marginTop: '12px', border: '1px solid', borderRadius: '6px', color: 'white', backgroundColor: '#3FA8A0'}}>Орындау</Button></Col>
                    <hr />
                </h3>
            </Row>
            {
                isOpen ? 
                <Row>
                <h3>Тапсырыстар</h3>
                <Row style={{

                    border: '1px solid ',
                    margin: '12px 0 0 0',
                    backgroundColor: '#52B69A'
                }}>
                    <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>№</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Тапсырыс</Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Толығырақ</Col>
                    <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Бағасы</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Аватар</Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Тапсырыс беруші</Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Көлік</Col>
                   
                    <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Нөмірі</Col>
                    <Col md={1} className="d-flex align-items-center justify-content-center"
                        style={{ color: 'white', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>Рейтинг</Col>
                </Row>

                {orders && orders.items && orders.items.map((item, i) => (
                    <Row style={{
                        border: '1px solid',
                        borderTop: 'none',
                        margin: '0',
                    }}>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{i + 1}</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.title}</Col>
                        <Col md={2} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.description}</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.clientPrice} KZT</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>
                                <img src={`http://localhost:5000${item?.owner?.avatar}`} style={{width: '100px', height: '100px', border: '1px solid'}} alt="" />  
                                </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.owner?.name}</Col>
                        <Col md={2} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.car?.color} {item?.car?.brand} {item?.car?.model}</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}>{item?.car?.number}</Col>
                        <Col md={1} className="d-flex align-items-center justify-content-center"
                            style={{ color: 'black', fontWeight: '500', fontSize: '16px', padding: '12px 0' }}><Rating size={20} readonly initialValue={(item?.car?.rating[0])}/> &nbsp; {item?.car?.rating[0]}</Col>
                    </Row>
                ))}


            </Row>
            : <h4>{'Сізге админ панелі ақпараттарын көруге рұқсат жоқ!'}</h4>
            }
            
        </Container>
    </>)
}

export default Admin