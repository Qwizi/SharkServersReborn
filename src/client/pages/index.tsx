import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../hocs/withAuth";
import {Badge, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {Servers} from "../components/index/servers.component";
import {ShopServicesComponent} from "../components/index/shopServices.component";
import {ServerCard} from "../components/index/serverCard.component";

export const getServerSideProps = withAuthServerSideProps();

const Index = ({user}: {user:any}) => {
    return (
        <Row>
            <Col sm={4}>
               <Servers />
            </Col>
        </Row>
    )
}

export default Index