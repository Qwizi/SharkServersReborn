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
    const [activeKey, setActiveKey] = useState('/profile/password');
    const [currentPassword, setCurrentPaassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [btnStatus, setBtnStatus] = useState(true)
    const [errors, setErrors] = useState<Error| null>(null);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);

    interface Error {
        statusCode: number;
        message: string;
        error: string
    }

    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname)
        setActiveKey(router.pathname);
    }, [router.pathname]);

    const changePassword = async (e) => {
        try {
            e.preventDefault();
            if (newPassword !== newPasswordConfirm)
            {
                setErrors({
                    message: 'Hasła nie są identyczne',
                    error: 'Hasła nie są identyczne',
                    statusCode: 400
                })
            } else {
                const response = await axios.post('/api/profile/password', {
                    old_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirm: newPasswordConfirm
                })
                if (response.status === 200) {
                    await router.push('/profile/password', undefined, {shallow: true})
                    setSuccessAlertStatus(true);
                }
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
                <Col><h1>Zaaktualizuj haslo</h1></Col>
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
                            Pomyślnie zmieniono hasło
                        </Alert>
                    )}
                    <Form method={"post"} onSubmit={changePassword}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Obecne hasło</Form.Label>
                            <Form.Control
                                minLength={8}
                                maxLength={40}
                                type="password"
                                required={true}
                                value={currentPassword}
                                placeholder="Podaj obecne hasło"
                                onChange={(e) => setCurrentPaassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Nowe hasło</Form.Label>
                            <Form.Control
                                minLength={8}
                                maxLength={40}
                                type="password"
                                required={true}
                                value={newPassword}
                                placeholder="Podaj nowe hasło"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Wprowadz nowe haslo ponownie</Form.Label>
                            <Form.Control
                                minLength={8}
                                maxLength={40}
                                type="password"
                                required={true}
                                value={newPasswordConfirm}
                                placeholder="Podaj nowe hasło ponownie"
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
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