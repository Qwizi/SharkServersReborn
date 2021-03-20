import {Badge, Card, Col, Nav, Row} from "react-bootstrap";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const RecruitmentCard = ({positions, activeKey, children}) => {
    useEffect(() => {
        console.log(activeKey)
    }, [])

    if (!positions.data) return <div/>

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1>Rekrutacja</h1>
                                </Card.Title>
                                <Card.Subtitle>
                                    Wybierz na jakie stanowisko chcesz wyslac podanie
                                </Card.Subtitle>
                                <br/>
                                {positions.data && positions.data.length > 0 ? (
                                    <Nav fill variant="tabs" defaultActiveKey={activeKey}>
                                        {positions.data && positions.data.map(position => {
                                            if (position.role) {
                                                return (
                                                    <Nav.Item>
                                                        <Link href={`/recruitment/${position.role.name || ''}`} passHref>
                                                            <Nav.Link href={`/recruitment/${position.role.name}`}>{position.role.name} <Badge variant={"success"}>{position.free_space}</Badge></Nav.Link>
                                                        </Link>
                                                    </Nav.Item>
                                                )
                                            }
                                        }
                                        )}
                                    </Nav>
                                ) : (<div>Aktualnie nie prowadzimy rekrutacji</div>)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {children}
            </Col>
        </Row>
    )
}