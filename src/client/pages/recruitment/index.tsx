
import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../../hocs/withAuth";
import {Badge, Card, Col, ListGroup, Nav, ProgressBar, Row} from "react-bootstrap";
import api from "../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../components/index/news.component";
import {NewsCard} from "../../components/index/newsCard.component";
import Link from "next/link";
import {RecruitmentCard} from "../../components/recruitment/recruitmentCard.component";


export const getServerSideProps = withAuthServerSideProps(async (context) => {
    try {
        const positionsResponse = await api.getRecruitmentPositions();
        console.log(positionsResponse.data)
        const positions = positionsResponse.data;
        return {positions: positions}
    } catch (e) {
        console.log(e);
        return {positions: null}
    }
});

const RecruitmentPositionIndex = ({user, data}) => {
    const [activeKey, setActiveKey] = useState('');
    const router = useRouter()
    useEffect(() => {
        setActiveKey(router.pathname)
    }, [])

    if (!data || !data.positions) return <div/>

    return (
        <RecruitmentCard positions={data.positions} activeKey={activeKey}>
            <div/>
        </RecruitmentCard>
    )
}

export default RecruitmentPositionIndex