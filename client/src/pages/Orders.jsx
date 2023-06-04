import React from "react";
import { Container, Row, Col, Button, Card, Form, Alert, Modal } from "react-bootstrap";

import Order from "../components/Order/OrderA"
import "../styles/Orders.scss"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetAllOrders } from "../redux/slices/order.js"
import { fetchGetAllCars } from "../redux/slices/auth";
import { Rating } from 'react-simple-star-rating'
import CarBody from "../components/CarBody/CarBody";

const Orders = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchGetAllOrders())
    dispatch(fetchGetAllCars())
  },[])

  const userData = useSelector((state) => state.auth.data);

  const { orders } = useSelector((state) => state.orders);
  const cars = useSelector(state => state.auth.cars.items);
/////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////

  const [sorted, setSorted] = React.useState()

  const inputFileRef = React.useRef(null);

  const image =
    "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2023/overview/cards/2023-nissan-gtr-solid-red-driving-on-track-overhead-view.jpg";

  const altImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

    const [responseMessage, setResponseMessage] = React.useState('');

    const handleGetResponse = (response) => {
      setResponseMessage(response)
    }

    // const sorted = []



    React.useEffect(() => {
      orders && orders.items && orders.items.forEach((item, i) => {
      console.log('usr id', userData && userData._id, 'item id', item.owner._id)
      if ((userData && userData._id) == item.owner._id) {
        setSorted(item)
      }
    })
    }, [orders])

    console.log(orders && orders.items)

    console.log('cars', cars && cars)
    

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
        <h3>Менің тапсырыстарым</h3>
          { orders && orders.items && orders.items.map((item, i) => (
            item.owner._id == (userData && userData._id)  && 
            <Col md={6} sm={12} xs={12}>
              <Order
                key={i}
                i={i}
                id={item._id}
                title={item.title}
                datetime={item.datetime}
                description={item.description}
                category={item.category}
                car={item.car}
                cars={cars}
                driver={
                  cars?.map((c, i) => c?._id == item?.car?._id &&  c?.driver)
                }
                clientPrice={item?.clientPrice}
                driverPrice={item?.driverPrice}
                status={item.status}
                img={item.img}
                isOwner={true}
                response={handleGetResponse}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Orders;
