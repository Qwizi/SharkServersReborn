import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import '../style.css';
import {Container, Navbar} from "react-bootstrap";
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
                    <Navbar.Brand href="#home">
                        SharkServersReborn
                    </Navbar.Brand>
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