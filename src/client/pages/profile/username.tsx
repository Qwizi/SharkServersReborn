import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Alert, Button, Card, Col, Form, Nav, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";
import {ProfileNavBody} from "../../components/profileNavBody.component";
import axios from "axios";

export const getServerSideProps = withAuthServerSideProps();

const ProfileUsername = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/username');
    const [username, setUsername] = useState('')
    const [btnStatus, setBtnStatus] = useState(true)
    const [errors, setErrors] = useState<Error | null>(null);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);


    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
        setActiveKey(router.pathname);
    }, [router.pathname]);

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zmień </Button> : <Button variant="primary" type="submit" disabled> Zmień </Button>

    const changeUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/profile/username', {
                username: username
            })
            if (response.status === 200) {
                await router.push('/profile/username', undefined, {shallow: true})
                setSuccessAlertStatus(true);
            }
        } catch (e) {
            console.log(e);
            if (e.response) {
                setErrors(e.response.data);
            }
        }
    }

    return (
        <ProfileNavBody activeKey={activeKey}>
            <Row>
                <Col><h1>Zmień nazwe użytkownika</h1></Col>
            </Row>
            <Row>
                <Col>
                    {errors && (
                        <Alert variant="danger">
                            {errors.message}
                        </Alert>
                    )}
                    {successAlertStatus && (
                        <Alert variant="success">
                            Pomyślnie zmieniono nazwe użytkownika
                        </Alert>
                    )}
                    <Form method={"post"} onSubmit={changeUsername}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control
                                minLength={5}
                                maxLength={32}
                                type="text"
                                required={true}
                                value={username}
                                placeholder="Podaj nazwe użytkownika"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        {btn}
                    </Form>
                </Col>
            </Row>
        </ProfileNavBody>
    )
}

export default withAuthComponent(ProfileUsername);