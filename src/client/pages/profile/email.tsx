import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Card, Col, Nav, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";

export const getServerSideProps = withAuthServerSideProps();

const ProfileEmail = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/email');

    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
        setActiveKey(router.pathname);
    }, [router.pathname]);

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
                        <Row>
                            <Col><h1>Zaaktualizuj email</h1></Col>
                        </Row>
                        <Row>
                            <Col>
                                Zmiana emaila
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default withAuthComponent(ProfileEmail);