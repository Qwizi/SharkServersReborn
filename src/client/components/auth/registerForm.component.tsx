import {Button, Form} from "react-bootstrap";
import React from "react";

export const RegisterForm = ({btnStatus, username, setUsername, email, setEmail, password, setPassword, register}) => {
    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zarejestruj </Button> : <Button variant="primary" type="submit" disabled> Zarejestruj </Button>

    return (
        <Form method={"post"} onSubmit={register}>
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
            {btn}
        </Form>
    )
}