import {Alert, Card, Col, Form, Row} from "react-bootstrap";
import Link from "next/link";
import React from "react";

export const AuthCard = ({title, children}) => {
    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        {children}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}