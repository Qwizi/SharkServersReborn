import React, {useEffect, useState} from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useRouter} from "next/router";
import axios from "axios";
import {async} from "rxjs";

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

const Index: ({data}: InferGetServerSidePropsType<() => Promise<{ props: { data: any } }>>) => JSX.Element = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [code, setCode] = useState('');
    const [btnStatus, setBtnStatus] = useState(true);
    const [successAlertStatus, setSuccessAlertStatus] = useState(false);
    const [errors, setErrors] = useState<Error | null>(null);

    const router = useRouter()

    useEffect(() => {
        if (router.query.code) {
            activateAccountEncryptedCode(router.query.code);
        }
        return () => {
            setBtnStatus(true)
            setSuccessAlertStatus(false)
            setErrors(null);
        }
    }, [])

    useEffect(() => {
        if (router.query.success) {
            setSuccessAlertStatus(true);
        }
        return () => setSuccessAlertStatus(false);
    }, [router.query.success])

    const activateAccountEncryptedCode = async (code: string | string[]) => {
        try {
            const response = await axios.post('/api/activate-account/encrypted', {
                code: code
            })
            if (response.status === 200) {
                await router.push('/activate-account?success=1', undefined, {shallow: true})
            } else {
                setErrors(response.data);
            }
        } catch (e) {
            console.log(e.message);
            setErrors(e.response.data);
        }
    }

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('Wyslany formularz')
            const response = await axios.post('/api/activate-account', {
                code: code
            })
            if (response.status === 200) {
                setBtnStatus(false);
                setCode('');
                await router.push('/activate-account?success=1', undefined, {shallow: true})
            }
        } catch (e) {
            console.log(e.message);
            setErrors(e.response.data);
        }

    }

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Aktywuj </Button> : <Button variant="primary" type="submit" disabled> Aktywuj </Button>

    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                {successAlertStatus && (
                    <Alert variant="success">
                        Pomyślnie aktywowano konto
                    </Alert>
                )}
                <h1 className="text-center">Aktywacja konta</h1>
                {errors && (
                    <Alert variant="danger">
                        {errors.message}
                    </Alert>
                )}
                <Form method={"post"} onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formCode">
                        <Form.Label>Kod</Form.Label>
                        <Form.Control
                            type="text"
                            minLength={6}
                            maxLength={6}
                            required={true}
                            value={code}
                            placeholder="Wpisz kod"
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                        />
                    </Form.Group>
                    {btn}
                </Form>
            </Col>
        </Row>
    )
}

export default Index