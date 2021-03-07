import React, {useEffect, useState} from 'react'
import {Alert} from "react-bootstrap";
import {useRouter} from "next/router";
import api from "../../uitils/api";
import {AuthCard} from "../../components/auth/card.component";
import {RegisterForm} from "../../components/auth/registerForm.component";

interface Error {
    statusCode: number;
    message: string;
    error: string
}
const Register = () => {
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

    const clear = () => {
        setBtnStatus(false);
        setUsername('');
        setEmail('')
        setPassword('')
    }

    const register = async (e) => {
        try {
            e.preventDefault();
            console.log('wyslany');
            const response = await api.register(username, email, password);
            if (response.status === 200) {
                clear();
                await router.push('/auth/register?success=1', undefined,  {shallow: true})
            }
        } catch (e) {
            console.log(e.message)
            console.log(e.response.data);
            setErrors(e.response.data);
        }
    }
    return (
        <AuthCard title={"Rejestracja"}>
            {successAlertStatus && (
                <Alert variant="success">
                    Na twój adres email został wysłany link do aktywacji konta
                </Alert>
            )}
            {errors && (
                <Alert variant="danger">
                    {errors.message}
                </Alert>
            )}
            <RegisterForm
                btnStatus={btnStatus}
                register={register}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
            />
        </AuthCard>
    )
}

export default Register