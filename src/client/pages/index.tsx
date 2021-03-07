import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../hocs/withAuth";
import {Badge, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {Servers} from "../components/index/servers.component";
import {ShopServices} from "../components/index/shopServices";
import {News} from "../components/index/news.component";
export const getServerSideProps = withAuthServerSideProps();

const Index = ({user}: {user:any}) => {
    return (
        <Row>
            <Col lg={4}>
               <Servers />
               <ShopServices/>
            </Col>
            <Col lg={{offset: 1 }}>
                <News />
            </Col>
        </Row>
    )
}

export default Index