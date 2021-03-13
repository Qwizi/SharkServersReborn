
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

    return (
        <RecruitmentCard positions={data.positions} activeKey={activeKey}>
            <div/>
        </RecruitmentCard>
        /*<Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h1>Rekrutacja</h1>
                        </Card.Title>
                        <Card.Subtitle>
                            Wybierz na jakie stanowisko chcesz wyslac podanie
                        </Card.Subtitle>
                        <br/>
                        {data && data.positions.data && data.positions.data.length > 0 ? (
                            <Nav fill variant="tabs" defaultActiveKey={`/recruitment/${data.positions.data[0].role.name}`}>
                                {data.positions.data && data.positions.data.map(position =>
                                    <Nav.Item>
                                        <Link href={`/recruitment/${position.role.name}`} passHref>
                                            <Nav.Link href={`/recruitment/${position.role.name}`}>{position.role.name} <Badge variant={"success"}>{position.free_space}</Badge></Nav.Link>
                                        </Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                        ) : (<div>Aktualnie nie prowadzimy rekrutacji</div>)}

                    </Card.Body>
                </Card>
            </Col>
        </Row>*/
    )
}

export default RecruitmentPositionIndex