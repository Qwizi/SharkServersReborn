import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../../hocs/withAuth";
import {Badge, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import api from "../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../components/index/news.component";
import {NewsCard} from "../../components/index/newsCard.component";


export const getServerSideProps = withAuthServerSideProps(async (context) => {
    try {
        console.log(context.query);
        const newsResponse = await api.getNews(context.query.param);
        const news = newsResponse.data;
        return {news: news}
    } catch (e) {
        console.log(e);
        return {props: {news: null}}
    }
});

const NewsDetail = ({user, data}) => {

    useEffect(() => {
        console.log(data);
    }, [])

    return (
        <Row>
            <Col>
                <h1>{data.news.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.news.content}}/>
            </Col>
        </Row>
    )
}

export default NewsDetail