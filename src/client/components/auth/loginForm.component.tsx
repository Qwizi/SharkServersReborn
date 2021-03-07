import {Button, Form} from "react-bootstrap";
import Link from "next/link";
import React from "react";

export const LoginForm = ({login, btnStatus, username, password, setPassword, setUsername}) => {

    let btn;
    btn = btnStatus ? <Button variant="primary" type="submit"> Zaloguj </Button> : <Button variant="primary" type="submit" disabled> Zaloguj </Button>

    return (
        <Form method={"post"} onSubmit={login}>
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
            <Form.Group>
                <Form.Text className="text-muted">
                    <Link href={"/reset-password/send"}> Zapomniałem hasła</Link>
                </Form.Text>
            </Form.Group>
            {btn}
        </Form>
    )
}