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
                <div className="header" style={{
                    minHeight: '25vh',
                    background: '#007bff'
                }}/>
                <div className="main" style={{
                    margin: '-60px 30px 0px',
                    borderRadius: '6px',
                    boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
                    zIndex: 3,
                    position: 'relative',
                    paddingBottom: '150px',
                    background: '#ffffff'
                }}>
                    <Container style={{padding: '24px 16px 0', background: '#ffffff'}}>
                        <Component {...pageProps} />
                    </Container>
                </div>
        </div>
    )
}

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    return {...appProps}
}

export default MyApp