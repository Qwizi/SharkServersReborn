import {Button, Card, Col, Media, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {NewsCard} from "./newsCard.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'

export const News = ({data}) => {

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h4> <FontAwesomeIcon icon={faNewspaper}/> Aktualnosci</h4>
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