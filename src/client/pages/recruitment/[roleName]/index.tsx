
import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../../../hocs/withAuth";
import {Badge, Button, Card, Col, ListGroup, Nav, ProgressBar, Row, Table} from "react-bootstrap";
import api from "../../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../../components/index/news.component";
import {NewsCard} from "../../../components/index/newsCard.component";
import Link from "next/link";
import {RecruitmentCard} from "../../../components/recruitment/recruitmentCard.component";
import {RecruitmentApplicationsTable} from "../../../components/recruitment/recruitmentApplicationsTable";
import {RequestQueryBuilder} from "@nestjsx/crud-request";


const getApplications = async (context) => {
    try {
        let roleNameSplit = context.params.roleName.split('-')
        const positionRoleName = roleNameSplit[1]
        console.log(positionRoleName);

        let qb = RequestQueryBuilder.create();
        qb.select(['id'])
        qb.setJoin({field: 'role', select: ["name"]})
        qb.setFilter({field: "role.name", operator: "$eq", value: positionRoleName})

        const positionResponse = await api.getPositions(qb.query())

        console.log(positionResponse)

        if (positionResponse.status !== 200) {
            return {
                position: null,
                applications: null
            }
        }

        qb = RequestQueryBuilder.create()
        qb.select(["id", "status"])
        qb.setJoin({field: "author", select: ["display_name", "avatar"]})
        qb.setJoin({field: "author.roles", select: ["color"]})
        qb.setJoin({field: "position", select: ["id, free_space"]})
        qb.setJoin({field: "position.role", select: ["id, name"]})
        qb.setFilter({field: "position.id", operator: "$eq", value: positionResponse.data.data[0].id})

        const applicationsResponse = await api.getApplications(qb.query())

        if (applicationsResponse.status !== 200) {
            return {
                position: null,
                applications: null
            }
        }

        return {
            position: positionResponse.data.data[0],
            applications: applicationsResponse.data
        }
    } catch (e) {
        console.log(e);
        return {
            position: null,
            applications: null
        }
    }
}

const RecruitmentApplications = ({user, data}) => {
    const router = useRouter();

    useEffect(() => {
        console.log(data);
    },[])
    return (
       <RecruitmentApplicationsTable roleName={data.position.role.name} applications={data.applications}/>
    )
}
export const getServerSideProps = withAuthServerSideProps(async (context) => getApplications(context));

export default RecruitmentApplications