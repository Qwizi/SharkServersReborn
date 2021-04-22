import App, { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import '../style.css';
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "../components/navbar.component";
import { withAuthServerSideProps } from "../hocs/withAuth";
import { Breadcrumbs } from 'nextjs-breadcrumbs'
import { useContext, useEffect, useState } from "react";

//import { SocketContext, socket } from '../context/socket.context';

export const getServerSideProps = withAuthServerSideProps();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const breadcrumbs = Breadcrumbs()
  // @ts-ignore
  return (
    <div>
      <Head>
        <script src="https://unpkg.com/react/umd/react.production.min.js" />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
        <title>SharkServers - Reborn</title>
      </Head>
      <style jsx global>{`
              body {
                background-color: #002650;
                color: rgba(255,255,255,0.8);
                //background-image: url(https://wallpapercave.com/wp/ucgl8Qx.jpg);
                background-attachment: fixed;
              }
              .table {
                color: rgba(255,255,255,0.8);
              }
              
              body:after {
                content : "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                /*background-image: url("http://localhost:3000/bg.jpg");*/
                //background-image: url("https://d212vo0owly06i.cloudfront.net/en/sc2/plugins/discourse-blizzard-themes/images/backgrounds/sc2/top.jpg");
                background: url('https://d212vo0owly06i.cloudfront.net/en/sc2/plugins/discourse-blizzard-themes/images/backgrounds/sc2/top.jpg') center -100px no-repeat,url('https://d212vo0owly06i.cloudfront.net/en/sc2/plugins/discourse-blizzard-themes/images/backgrounds/sc2/repeat.jpg') center -100px repeat-y;
                background-position: center;
                background-attachment: fixed;
                width: 100%;
                height: 100%;
                opacity : 0.8;
                z-index: -1;
            }

              .card {
                background-color: rgba(255,255,255,0.05);
              }

              .list-group-item {
                //background-color: #28282B;
                background-color: rgba(255,255,255,0.05);
              }

              .breadcrumb {
                background-color: rgba(255,255,255,0.05);
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
              .table-hover {
                cursor: pointer;
              }
            `}
      </style>

      <NavBar user={pageProps.user} />
      <Container style={{ padding: '24px 16px 0' }}>
        {breadcrumbs}
        <Component {...pageProps} />
      </Container>
    </div>
  )
}

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default MyApp