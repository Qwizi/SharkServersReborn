import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import '../style.css';
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../components/navbar.component";
import {withAuthServerSideProps} from "../hocs/withAuth";

export const getServerSideProps = withAuthServerSideProps();

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
                <NavBar user={pageProps.user}/>
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