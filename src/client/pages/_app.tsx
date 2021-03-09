import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import '../style.css';
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from "../components/navbar.component";
import {withAuthServerSideProps} from "../hocs/withAuth";
import { Breadcrumbs } from 'nextjs-breadcrumbs'

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
            `}
            </style>
            <NavBar user={pageProps.user}/>
            <div className="header d-flex justify-content-center" style={{
                minHeight: '45vh',
                background: 'linear-gradient(90deg, rgba(67,206,162,1) 0%, rgba(24,90,157,1) 47%);',
                //backgroundImage: 'url("http://localhost:3000/banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                alignItems: 'center'
            }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="brand text-center divshop-header-shop-title">
                                <h2 className="title text-center">Strona główna</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="main" style={{
                margin: '-60px 30px 30px',
                borderRadius: '6px',
                boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
                zIndex: 3,
                position: 'relative',
                paddingBottom: '150px',
                background: '#28282B'
            }}>
                <Container style={{padding: '24px 16px 0'}}>
                    {breadcrumbs}
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