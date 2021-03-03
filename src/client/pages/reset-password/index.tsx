import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {InferGetServerSidePropsType} from 'next'
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import axios from "axios";
import {async} from "rxjs";
import Link from "next/link";

interface Error {
    statusCode: number;
    message: string;
    error: string
}

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json();
    return {props: {data}}
}

const ResetPassword: ({data}: InferGetServerSidePropsType<() => Promise<{ props: { data: any } }>>) => JSX.Element = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [btnStatus, setBtnStatus] = useState(true);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);
    const [errors, setErrors] = useState<Error | null>(null);

    const router = useRouter()

    useEffect(() => {
        (async () => {
           if (router.query.code) {
               if (!await checkCode(router.query.code)) {
                   await router.push('/reset-password/send', undefined, {shallow: true})
               }
           } else {
               await router.push('/reset-password/send', undefined, {shallow: true})
           }
        })();
        return () => {
            setBtnStatus(true)
            setSuccessAlertStatus(false)
            setErrors(null);
        }
    }, [router.query.code])

    useEffect(() => {
        if (router.query.success) {
            setSuccessAlertStatus(true);
        }
        return () => setSuccessAlertStatus(false);
    }, [router.query.success])

    const checkCode = async (encryptedCode: string | string[]) => {
        try {
            const response = await axios.post(`/api/reset-password/check`, {
                encrypted_code: encryptedCode
            })
            return response.data.status;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    const handleFormChangePasswordSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('Wyslany formularz')
            const response = await axios.post('/api/reset-password/', {
                encrypted_code: router.query.code,
                new_password: password,
            })
            if (response.status === 200) {
                setBtnStatus(false);
                setPassword('');
                setPassword2('');
                await router.push('/reset-password?success=1', undefined, {shallow: true})
            }
        } catch (e) {
            console.log(e.message);
            setErrors(e.response.data);
        }
    }

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Przypomnij </Button> :
        <Button variant="primary" type="submit" disabled> Przypomnij </Button>
    if (!router.query.code) return <div/>;
    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                {successAlertStatus && (
                    <Alert variant="success">
                        Wyslano link do formularza zmiany hasla na twoj adres email
                    </Alert>
                )}
                <h1 className="text-center">Utworz nowe haslo</h1>
                {errors && (
                    <Alert variant="danger">
                        {errors.message}
                    </Alert>
                )}
                <Form method={"post"} onSubmit={handleFormChangePasswordSubmit}>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            minLength={8}
                            maxLength={40}
                            type="password"
                            required={true}
                            value={password}
                            placeholder="Hasło"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Powtórz hasło</Form.Label>
                        <Form.Control
                            minLength={8}
                            maxLength={40}
                            type="password"
                            required={true}
                            value={password2}
                            placeholder="Powtorz haslo"
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </Form.Group>
                    {btn}
                </Form>
            </Col>
        </Row>
    )
}

export default ResetPassword