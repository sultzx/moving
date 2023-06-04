import React from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

import Order from "../components/Order/OrderB";
import "../styles/Orders.scss";

import { useDispatch, useSelector } from "react-redux"
import { fetchGetAllOrders } from "../redux/slices/order.js"
import { fetchAuthMe } from "../redux/slices/auth";

const OrdersForEmp = () => {

  const inputFileRef = React.useRef(null);

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe()) 
    dispatch(fetchGetAllOrders())
  },[])

  const { orders } = useSelector((state) => state.orders);

  const image =
    "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2023/overview/cards/2023-nissan-gtr-solid-red-driving-on-track-overhead-view.jpg";

  const altImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";

  

  return (
    <>
      <Container>
        <br />
        <Row> 
        <h3>Тапсырыстар</h3>
          {orders && orders.items && orders.items.map((item, i) => (
            <Col lg={6} md={12} sm={12} xs={12}>
              <Order
                key={i}
                i={i}
                id={item._id}
                title={item.title}
                datetime={item.datetime}
                description={item.description}
                category={item.category}
                clientPrice={item?.clientPrice}
                driverPrice={item?.driverPrice}
                status={item.status}
                img={item.img}
                owner={item.owner}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default OrdersForEmp;
