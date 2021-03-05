import {Nav} from "react-bootstrap";
import Link from "next/link";
import React from "react";

export const ProfileNav = ({activeKey}) => {
    return (
        <Nav variant="pills" defaultActiveKey={activeKey} className="flex-column">
            <Nav.Item>
                <Link href={"/profile"} passHref>
                    <Nav.Link href="/profile" className="text-center">Ogolne</Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link href={"/profile/username"} passHref>
                    <Nav.Link href="/profile/username" className="text-center">Nazwa użytkownika</Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link href={"/profile/email"} passHref>
                    <Nav.Link href="/profile/email" className="text-center">Email</Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link href={"/profile/password"} passHref>
                    <Nav.Link href="/profile/password" className="text-center">Hasło</Nav.Link>
                </Link>
            </Nav.Item>
        </Nav>
    )
}