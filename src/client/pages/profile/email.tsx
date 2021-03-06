import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";
import {Alert, Button, Card, Col, Form, Nav, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import {ProfileNav} from "../../components/profileNav.component";
import {ProfileNavBody} from "../../components/profileNavBody.component";
import axios from "axios";

export const getServerSideProps = withAuthServerSideProps();

const ProfileEmail = ({user}: { user: any }) => {
    const [activeKey, setActiveKey] = useState('/profile/email');
    const [email, setEmail] = useState('')
    const [btnStatus, setBtnStatus] = useState(true)
    const [errors, setErrors] = useState<Error | null>(null);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);

    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
        setActiveKey(router.pathname);
    }, [router.pathname]);

    const changeEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/profile/email', {
                email: email
            })
            if (response.status === 200) {
                await router.push('/profile/email', undefined, {shallow: true})
                setSuccessAlertStatus(true);
            }
        } catch (e) {
            console.log(e);
            if (e.response) {
                setErrors(e.response.data);
            }
        }
    }

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zmień </Button> :
        <Button variant="primary" type="submit" disabled> Zmień </Button>

    return (
        <ProfileNavBody activeKey={activeKey}>
            <Row>
                <Col><h1>Zaaktualizuj email</h1></Col>
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
                            Pomyślnie wyslano linka do zmiany emaila
                        </Alert>
                    )}
                    <Form method={"post"} onSubmit={changeEmail}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required={true}
                                value={email}
                                placeholder="Podaj email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        {btn}
                    </Form>
                </Col>
            </Row>
        </ProfileNavBody>
    )
}

export default withAuthComponent(ProfileEmail);