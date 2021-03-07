import React, {useEffect, useState} from 'react'
import {withAuthComponent, withAuthServerSideProps} from "../../hocs/withAuth";
import {Badge, Button, Col, ListGroup, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNavBody} from "../../components/profileNavBody.component";
import api, {AccountTypes} from "../../uitils/api";

export const getServerSideProps = withAuthServerSideProps();

const ProfileIndex = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/connectedAccounts');
    const [steamConnected, setSteamConnected] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setActiveKey(router.pathname);
        setSteamConnected(!!user.steam_profile)
    }, []);

    const disconnectAccount = async (account: AccountTypes) => {
        try {
            const response = await api.disconnectAccount(AccountTypes.STEAM);
            if (response.status === 200) {
                await router.push('/profile/connectedAccounts', undefined, {shallow: true})
                setSteamConnected(false);
            }
        } catch (e) {
            console.log(e);
            if (e.response) {
                console.log(e.response.data);
            }
        }
    }

    let steamProfileConnectedStatus;
    steamProfileConnectedStatus = steamConnected
        ? <Badge variant="success">Połączono</Badge>
        : <Badge variant="secondary">Nie połaczono</Badge>

    let steamConnectedBtn;
    steamConnectedBtn = !steamConnected
        ? <Button variant="primary" onClick={() => router.push('/auth/connect-account/steam')}>Polacz</Button>
        : <Button variant="danger" onClick={() => disconnectAccount(AccountTypes.STEAM)}>Rozłącz</Button>

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
                                    {steamConnectedBtn}
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