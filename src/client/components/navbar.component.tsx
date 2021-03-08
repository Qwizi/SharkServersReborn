import React, {useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from "next/link";
export const NavGuest = (props) => {
    return (
        <Nav>
            <Link href={"/auth/login"} passHref>
                <Nav.Link href="/login">Zaloguj</Nav.Link>
            </Link>
            <Link href={"/auth/register"} passHref>
                <Nav.Link href="/register">Zarejestruj</Nav.Link>
            </Link>
        </Nav>
    )
}

export const NavLogged = ({username, avatar}) => {
    return (
        <Nav>
            <NavDropdown title={username} id="basic-nav-dropdown">
                <Link href={"/profile"} passHref>
                    <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link href={"/auth/logout"} passHref>
                    <NavDropdown.Item href="#action/3.2">Wyloguj</NavDropdown.Item>
                </Link>
            </NavDropdown>
        </Nav>
    )
}

export const NavBar = ({user}: {user: any}) => {

    useEffect(() => {
        console.log(user);
    }, [])

    let navLinks;
    navLinks = user == null ? <NavGuest /> : <NavLogged username={user.display_name} avatar={user.avatar}/>;

    return (
        <Navbar collapseOnSelect expand={"lg"} bg="dark" variant="dark">
            <Container>
                <Link href={"/"} passHref>
                    <Navbar.Brand>
                        SharkServersReborn
                    </Navbar.Brand>
                </Link>
                <Nav>
                    <Link href={"/shop"} passHref>
                        <Nav.Link href="/login">Sklep</Nav.Link>
                    </Link>
                    <Link href={"/applications"} passHref>
                        <Nav.Link href="/register">Rekrutacja</Nav.Link>
                    </Link>
                    <Link href={"/applications"} passHref>
                        <Nav.Link href="/register">Bany</Nav.Link>
                    </Link>
                    <Link href={"/applications"} passHref>
                        <Nav.Link href="/register">Statystyki</Nav.Link>
                    </Link>
                    <Link href={"/applications"} passHref>
                        <Nav.Link href="/register">Regulaminy</Nav.Link>
                    </Link>
                    <Link href={"/applications"} passHref>
                        <Nav.Link href="/register">Lista użytkowników</Nav.Link>
                    </Link>
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {navLinks}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}