import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Card, Col, Nav, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";
import {ProfileNavBody} from "../../components/profileNavBody.component";

export const getServerSideProps = withAuthServerSideProps();

const ProfileIndex = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile');

    const router = useRouter()

    useEffect(() => {
        setActiveKey(router.pathname);
    }, []);

    return (
        <ProfileNavBody activeKey={activeKey}>
            <Row>
                <Col><h1>Główne informacje</h1></Col>
            </Row>
            <Row>
                <Col>
                    <p>Nazwa użytkownika: <span style={{color: user.roles[0].color}}>{user.username}</span></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Email: {user.email}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Główna rola: <span style={{color: user.roles[0].color}}>{user.roles[0].name}</span></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Role: {user.roles.length}</p>
                </Col>
            </Row>
        </ProfileNavBody>
    )
}

export default withAuthComponent(ProfileIndex);