import React, {useEffect, useState} from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import axios from "axios";

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

const Register: ({data}: InferGetServerSidePropsType<() => Promise<{ props: { data: any } }>>) => JSX.Element = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnStatus, setBtnStatus] = useState(true);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);
    const [errors, setErrors] = useState<Error | null>(null);

    const router = useRouter()

    useEffect(() => {
        return () => setErrors(null);
    }, [])

    useEffect(() => {
        if (router.query.success) {
            setSuccessAlertStatus(true);
        }
        return () => setSuccessAlertStatus(false);
    }, [router.query.success])

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('wyslany');
            const response = await axios.post('/api/auth/register', {
                username: username,
                email: email,
                password: password
            })
            if (response.status === 200) {
                setBtnStatus(false);
                setUsername('');
                setEmail('')
                setPassword('')
                setTimeout(() => {
                    setBtnStatus(true)
                }, 5000)
                await router.push('/register?success=1', undefined,  {shallow: true})
            }
        } catch (e) {
            console.log(e.message)
            console.log(e.response.data);
            setErrors(e.response.data);
        }
    }

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zarejestruj </Button> : <Button variant="primary" type="submit" disabled> Zarejestruj </Button>

    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                {successAlertStatus && (
                    <Alert variant="success">
                        Na twój adres email został wysłany link do aktywacji konta
                    </Alert>
                )}
                <h1 className="text-center">Rejestracja</h1>
                {errors && (
                    <Alert variant="danger">
                        {errors.message}
                    </Alert>
                )}
                <Form method={"post"} onSubmit={handleFormSubmit}>
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
                        <Form.Text className="text-muted">
                            <ul>
                                <li>Min 5 znaki</li>
                                <li>Max 32 znaki</li>
                                <li>Tylko litery lub cyfry</li>
                            </ul>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required={true}
                            value={email}
                            placeholder="Podaj adres email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

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
                    {/*<Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>*/}
                    {btn}
                </Form>
            </Col>
        </Row>
    )
}

export default Register