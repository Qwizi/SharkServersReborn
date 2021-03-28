
import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../../hocs/withAuth";
import {Badge, Card, Col, ListGroup, Nav, ProgressBar, Row} from "react-bootstrap";
import api from "../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../components/index/news.component";
import {NewsCard} from "../../components/index/newsCard.component";
import Link from "next/link";
import {RecruitmentCard} from "../../components/recruitment/recruitmentCard.component";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

const getPositions = async () => {
    try {
        const qb = RequestQueryBuilder.create();
        qb.select(["id", "free_space"])
        qb.setJoin({field: 'role', select: ["id", "name"]})
        qb.setFilter({field: 'free_space', operator: "$gt", value: 0})
        const response = await api.getPositions(qb.query())
        if (response.status !== 200) return {positions: {}}
        console.log(response.data);
        return {positions: response.data}
    } catch (e) {
        console.log(e);
        return {positions: {}}
    }
}

const RecruitmentPositionIndex = ({user, data}) => {
    const router = useRouter()

    if (!data || !data.positions || Object.keys(data.positions).length === 0) {
        return <div>Wystąpił problem z pobraniem aktualnych stanowisk</div>
    }

    return (
        <RecruitmentCard positions={data.positions} />
       /* <RecruitmentCard positions={data.positions} activeKey={activeKey}>
            <div/>
        </RecruitmentCard>*/
    )
}
export const getServerSideProps = withAuthServerSideProps(async (context) => getPositions());
export default RecruitmentPositionIndex