import React, {useEffect, useState} from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import axios from "axios";
import App, {AppContext} from "next/app";

interface Error {
    statusCode: number;
    message: string;
    error: string
}

export const getServerSideProps = async (context) => {
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json();
    return {props: {data}}
}


const Login: ({data}: InferGetServerSidePropsType<() => Promise<{ props: { data: any } }>>) => JSX.Element = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) =>  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [btnStatus, setBtnStatus] = useState(true);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);
    const [errors, setErrors] = useState<Error | null>(null);
    const router = useRouter()

    useEffect(() => {
        console.log(data);
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
            const response = await axios.post('/api/auth/login', {
                username: username,
                password: password
            })
            if (response.status === 201) {
                setBtnStatus(false);
                setUsername('');
                setPassword('')
                setTimeout(() => {
                    setBtnStatus(true)
                }, 5000)
                console.log(response.data);
                //setUser(response.data);
                await router.push('/', undefined,  {shallow: true})
            }
        } catch (e) {
            console.log(e.message)
            if (e.response) {
                console.log(e.response.data);
                setErrors(e.response.data);
            }

        }
    }

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zaloguj </Button> : <Button variant="primary" type="submit" disabled> Zaloguj </Button>

    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                <h1 className="text-center">Logowanie</h1>
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
                    {btn}
                </Form>
            </Col>
        </Row>
    )
}

export default Login