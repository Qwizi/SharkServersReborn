import {Card, Col, Row, Table} from "react-bootstrap";
import {ServerCard} from "./serverCard.component";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faBell } from '@fortawesome/free-solid-svg-icons'

export const Servers = () => {
    return (
        <Row>
            <Col>
                <h4><FontAwesomeIcon icon={faServer} /> Serwery</h4>
                <Row>
                    <Col>
                        <ServerCard
                            name={"Jailbreak"}
                            players={15}
                            maxPlayers={32}
                            map={"ba_jail_bhop"}
                            status={true}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ServerCard
                            name={"DeathRun"}
                            players={9}
                            maxPlayers={32}
                            map={"dr_bhop"}
                            status={true}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}