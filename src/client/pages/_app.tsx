import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import '../style.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <div>
            <Head>
                <script src="https://unpkg.com/react/umd/react.production.min.js"/>
                <script
                    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"/>
                <script
                    src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"/>
                <title>SharkServers - Reborn</title>
            </Head>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link href={"/"} passHref>
                        <Navbar.Brand>
                            SharkServersReborn
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#home">Zaloguj</Nav.Link>
                            <Link href={"/register"} passHref>
                                <Nav.Link href="#features">Zarejestruj</Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{padding: '24px 16px 0'}}>
                <Component {...pageProps} />
            </Container>
        </div>
    )
}

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)

    return {...appProps}
}

export default MyApp