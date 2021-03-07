import React, {useEffect, useState} from 'react'
import {Alert} from "react-bootstrap";
import {useRouter} from "next/router";
import api from "../../uitils/api";
import {AuthCard} from "../../components/auth/card.component";
import {LoginForm} from "../../components/auth/loginForm.component";

interface Error {
    statusCode: number;
    message: string;
    error: string
}

const Login = () =>  {
    const [username, setUsername] = useState('');
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
        setPassword('')
        setTimeout(() => {
            setBtnStatus(true)
        }, 5000)
    }

    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await api.login(username, password);
            if (response.status === 201) {
                clear();
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

    return (
        <AuthCard title={"Logowanie"}>
            {errors && (
                <Alert variant="danger">
                    {errors.message}
                </Alert>
            )}
            <LoginForm
                btnStatus={btnStatus}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                login={login}
            />
        </AuthCard>
    )
}

export default Login