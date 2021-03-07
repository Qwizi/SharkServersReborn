import {Badge, Card, Carousel, Col, ListGroup, Row} from "react-bootstrap";
import {ServiceCard} from "./serviceCard.component";

export const ShopServices = () => {
    return (
        <Row>
            <Col>
                <h4>Uslugi</h4>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Carousel>
                                    <Carousel.Item>
                                        <ServiceCard title={"SHARK"} days={7} items={[
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                        ]}/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ServiceCard title={"SHARK"} days={14} items={[
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                        ]}/>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ServiceCard title={"SHARK"} days={30} items={[
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                            'Dapibus ac facilisis',
                                            'Dapibus ac facilisis in',
                                        ]}/>
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}