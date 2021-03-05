import React, {useEffect} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Link from "next/link";
import {useAuth} from "../context/auth.context";
import {withAuthServerSideProps} from "../hocs/withAuth";

export const NavGuest = (props) => {
    return (
        <Nav>
            <Link href={"/login"} passHref>
                <Nav.Link href="/login">Zaloguj</Nav.Link>
            </Link>
            <Link href={"/register"} passHref>
                <Nav.Link href="/register">Zarejestruj</Nav.Link>
            </Link>
        </Nav>
    )
}

export const NavLogged = (props) => {
    return (
        <Nav>
            <Link href={"/logout"} passHref>
                <Nav.Link href="/logout">Wyloguj</Nav.Link>
            </Link>
        </Nav>
    )
}

export const NavBar = ({user}: {user: any}) => {

    useEffect(() => {
        console.log(user);
    }, [])

    let navLinks;
    navLinks = user == null ? <NavGuest /> : <NavLogged />;

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link href={"/"} passHref>
                    <Navbar.Brand>
                        SharkServersReborn
                    </Navbar.Brand>
                </Link>
                <Navbar.Collapse className="justify-content-end">
                    {navLinks}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}