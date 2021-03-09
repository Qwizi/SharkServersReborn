import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../hocs/withAuth";
import {Badge, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import {Servers} from "../components/index/servers.component";
import {ShopServices} from "../components/index/shopServices";
import {News} from "../components/index/news.component";
import axios from "axios";
import api from "../uitils/api";


export const getServerSideProps = withAuthServerSideProps(async (context) => {
    try {
        const newsResponse = await api.getNews();
        const news = newsResponse.data;
        return {news: news}
    } catch (e) {
        console.log(e);
        return {props: {news: null}}
    }
});

const Index = ({user, data}) => {
    return (
        <Row>
            <Col lg={4}>
               <Servers />
               {/*<ShopServices/>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h4>Ostatnie podania</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item>Link</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>*/}
            </Col>
            <Col lg={{offset: 1 }}>
                <News data={data.news}/>
                {/*<br/>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h4>Rekrutacja</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Admin Jailbreak <Badge variant={"success"}>2/4</Badge>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Admin Jailbreak <Badge variant={"success"}>2/4</Badge>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Admin Jailbreak <Badge variant={"success"}>2/4</Badge>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Opiekun Jailbreak <Badge variant={"secondary"}>1/1</Badge>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>*/}
            </Col>
        </Row>
    )
}

export default Index