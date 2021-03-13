
import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../../../hocs/withAuth";
import {Badge, Card, Col, ListGroup, Nav, ProgressBar, Row, Table} from "react-bootstrap";
import api from "../../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../../components/index/news.component";
import {NewsCard} from "../../../components/index/newsCard.component";
import Link from "next/link";
import {RecruitmentCard} from "../../../components/recruitment/recruitmentCard.component";
import {RecruitmentApplicationsTable} from "../../../components/recruitment/recruitmentApplicationsTable";


export const getServerSideProps = withAuthServerSideProps(async (context) => {
    try {
        const values =  await Promise.all([api.getRecruitmentPositions(), api.getRecruitmentApplications({
            "position.role.name": context.req.query.id
        })]);
        console.log(values);
        return {
            positions: values[0].data,
            applications: values[1].data,
        }

    } catch (e) {
        console.log(e);
        return {props: {
            positions: null,
            applications: null
        }}
    }
});

const RecruitmentApplications = ({user, data}) => {
    const router = useRouter();

    return (
        <RecruitmentCard positions={data.positions} activeKey={`/recruitment/${router.query.id}`}>
            {data.applications.data.length > 0 ? (
                <RecruitmentApplicationsTable applications={data.applications}/>
            ) : (
                <Row><Col><Card><Card.Body><Card.Title>Podania</Card.Title>Brak</Card.Body></Card></Col></Row>
            )}

        </RecruitmentCard>
    )
}

export default RecruitmentApplications