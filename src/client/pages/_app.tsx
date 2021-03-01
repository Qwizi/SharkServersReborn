import App, {AppProps, AppContext} from 'next/app'
import Head from 'next/head'
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.min.css"
                      integrity="sha512-ZXdNxOkLO3JhY/OLmPI6YjDfdGtBl2wMzt78E7MuAL5X6enqgDdAYGn99rx13hIk21aIU5inTWYV7BoWnde75w=="
                      crossOrigin="anonymous"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.13.0/antd.min.js"
                        integrity="sha512-fkbwTze2hwdgHtMbHXwiYfYwWm9Pi1sEoEJELt7fw605F6QSTxPdfXmxy1ZByInkuv6Ek6vnJYPNwKoZfmhqrQ=="
                        crossOrigin="anonymous">
                </script>
                <title>SharkServersReborn</title>
            </Head>
            <Layout className="layout">
                <Header>header</Header>
                <Content style={{ padding: '0 50px' }}>
                    <Component {...pageProps} />
                </Content>
                <Footer/>
            </Layout>
        </div>
    )
}

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)

    return {...appProps}
}

export default MyApp