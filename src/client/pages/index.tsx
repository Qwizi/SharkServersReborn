import React, {useContext, useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../hocs/withAuth";
import {Badge, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import {Servers} from "../components/index/servers.component";
import {ShopServices} from "../components/index/shopServices";
import {News} from "../components/index/news.component";
import axios from "axios";
import api from "../uitils/api";
import io from 'socket.io-client'
import {socket, SocketContext} from "../context/socket.context";

const getNews = async () => {
    try {
        const newsResponse = await api.getNews();
        const news = newsResponse.data;
        return news
    } catch (e) {
        console.log(e);
        return null
    }
}

const getServers = async () => {
    try {
        const serversResponse = await api.getServers();
        const servers = serversResponse.data;
        return servers
    } catch (e) {
        console.log(e);
        return null
    }
}

const Index = ({user, data}) => {

    return (
        <Row>
            <Col lg={4}>
               <Servers data={data.servers} socket={socket}/>
            </Col>
            <Col lg={{offset: 1 }}>
                <News data={data.news}/>
            </Col>
        </Row>
    )
}
export const getServerSideProps = withAuthServerSideProps(async (context) => {
    const values = await Promise.all([getNews(), getServers()])
    return {news: values[0], servers: values[1]};
});
export default Index