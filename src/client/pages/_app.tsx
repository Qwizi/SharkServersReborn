import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import '../style.css';
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../components/navbar.component";
import {withAuthServerSideProps} from "../hocs/withAuth";
import {Breadcrumbs} from 'nextjs-breadcrumbs'

export const getServerSideProps = withAuthServerSideProps();

const MyApp = ({Component, pageProps}: AppProps) => {
    const breadcrumbs = Breadcrumbs()

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
            <style jsx global>{`
              body {
                background-color: #28282B;
                color: #ffff;
              }

              .card {
                background-color: #28282B;
                border: 1px solid #28282B;
              }

              .list-group-item {
                background-color: #28282B;
              }

              .breadcrumb {
                background-color: #28282B;
                color: #ffff;
              }

              .breadcrumb li {
                margin-left: 5px;
              }
              .breadcrumb li:nth-child(1)::before {
                display: none;
              }
              
              .breadcrumb li::before {
                display: inline-block;
                padding-right: .5rem;
                padding-left: .5rem;
                color: #ffff;
                content: "/";
              }
            `}
            </style>
            <NavBar user={pageProps.user}/>
            <Container style={{padding: '24px 16px 0'}}>
                {breadcrumbs}
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