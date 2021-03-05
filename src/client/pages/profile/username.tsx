import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Card, Col, Nav, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";
import {ProfileNavBody} from "../../components/profileNavBody.component";

export const getServerSideProps = withAuthServerSideProps();

const ProfileUsername = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/username');

    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
        setActiveKey(router.pathname);
    }, [router.pathname]);

    return (
        <ProfileNavBody activeKey={activeKey}>
            <Row>
                <Col><h1>Zmień nazwe użytkownika</h1></Col>
            </Row>
            <Row>
                <Col>
                    Zmiana nazwy uzykownika
                </Col>
            </Row>
        </ProfileNavBody>
    )
}

export default withAuthComponent(ProfileUsername);