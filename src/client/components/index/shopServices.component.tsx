import {Badge, Card, Carousel, Col, ListGroup, Row} from "react-bootstrap";
import {ServiceCard} from "./serviceCard.component";

export const ShopServicesComponent = () => {
    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header>Usługi</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <ServiceCard title={"SHARK"} days={7} items={[
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                ]}/>
                            </Col>
                            <Col>
                                <ServiceCard title={"SHARK"} days={14} items={[
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                ]}/>
                            </Col>
                            <Col>
                                <ServiceCard title={"SHARK"} days={30} items={[
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                    'Dapibus ac facilisis',
                                    'Dapibus ac facilisis in',
                                ]}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}