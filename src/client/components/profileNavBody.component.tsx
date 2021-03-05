import {Card, Col, Row} from "react-bootstrap";
import {ProfileNav} from "./profileNav.component";
import React from "react";

export const ProfileNavBody = ({activeKey, children}) => {
    return (
        <Row style={{marginTop: "50px"}}>
            <Col lg={3}>
                <Card>
                    <Card.Body>
                        <ProfileNav activeKey={activeKey} />
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={8}>
                <Card>
                    <Card.Body>
                        {children}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}