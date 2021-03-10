
import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../../hocs/withAuth";
import {Badge, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import api from "../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../components/index/news.component";
import {NewsCard} from "../../components/index/newsCard.component";


export const getServerSideProps = withAuthServerSideProps(async (context) => {
    try {
        const newsResponse = await api.getNews();
        const news = newsResponse.data;
        return {news: news}
    } catch (e) {
        console.log(e);
        return {props: {news: null}}
    }
});

const NewsIndex = ({user, data}) => {

    useEffect(() => {
        console.log(data);
    }, [])

    return (
        <Row>
            <Col>
                {data.news && data.news.map(item =>
                    <NewsCard title={item.title} content={item.content} slug={item.slug} />
                )}
            </Col>
        </Row>
    )
}

export default NewsIndex