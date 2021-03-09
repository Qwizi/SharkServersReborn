import {Button, Card, Col, Media, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {NewsCard} from "./newsCard.component";
import axios from "axios";

export const News = ({data}) => {

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h4>Aktualnosci</h4>
                    </Col>
                </Row>
                {data && data.map(item =>
                    <Row>
                        <Col>
                            <NewsCard title={item.title} content={item.content} slug={item.slug}/>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    )
}