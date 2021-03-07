import {Button, Card, Col, Media, Row} from "react-bootstrap";
import React from "react";
import {NewsCard} from "./newsCard.component";

export const News = () => {
    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h4>Aktualnosci</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewsCard/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <NewsCard/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}