import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Badge, Button, Card, Col, ListGroup, Nav, Row, Table} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";
import {ProfileNavBody} from "../../components/profileNavBody.component";
import Image from 'next/image'
export const getServerSideProps = withAuthServerSideProps();

const ProfileIndex = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/connectedAccounts');
    const [steamConnected, setSteamConnected] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setActiveKey(router.pathname);
        setSteamConnected(!!user.steam_profile)
    }, []);

    let steamProfileConnectedStatus;
    steamProfileConnectedStatus = steamConnected ? <Badge variant="success">Połączono</Badge> : <Badge variant="secondary">Nie połaczono</Badge>

    let btn;
    btn = !steamConnected ? <Button variant="primary" onClick={() => router.push('/auth/connect-account/steam')}>Polacz</Button> : <Button variant="danger">Rozłącz</Button>

    return (
        <ProfileNavBody activeKey={activeKey}>
            <Row>
                <Col><h1>Połączone konta</h1></Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Steam {steamProfileConnectedStatus}
                                </Col>
                                <Col>
                                    {btn}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Discord <Badge variant="secondary">Nie połaczono</Badge>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={() => router.push('/auth/connect-account/discord')}>Polacz</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </ProfileNavBody>
    )
}

export default withAuthComponent(ProfileIndex);