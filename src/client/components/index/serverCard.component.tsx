import React from "react";
import {Badge, Button, Card, Col, ProgressBar, Row} from "react-bootstrap";

export const ServerCard = ({name, players, maxPlayers, status, map}) => {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Row>
                    <Col>
                        <ProgressBar now={50} label={`50%`} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Badge variant={"success"}>Online</Badge>
                    </Col>
                    <Col>
                        <Badge variant={"secondary"}>{players}/{maxPlayers}</Badge>
                    </Col>
                    <Col>
                        <Badge variant={"secondary"}>{map}</Badge>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="success" size={"sm"} >Polacz</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}