import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps} from "../../../hocs/withAuth";
import {
	Badge,
	Button,
	Card,
	Col,
	Form,
	ListGroup,
	Media,
	Nav,
	ProgressBar,
	Row,
	Tab,
	Table,
	Tabs
} from "react-bootstrap";
import api from "../../../uitils/api";
import {useRouter} from "next/router";
import {RecruitmentCard} from "../../../components/recruitment/recruitmentCard.component";
import {RequestQueryBuilder} from "@nestjsx/crud-request";

const getApplication = async (context) => {
	try {
		const applicationId = context.params.applicationId.replace('application-', '');
		let qb = RequestQueryBuilder.create();
		qb.setJoin({field: "author"})
		qb.setJoin({field: "position"})
		qb.setJoin({field: "position.role"})
		qb.setJoin({field: "steam_profile"})
		qb.setJoin({field: "questions_answers"})
		qb.setJoin({field: "questions_answers.question"})

		let qb2: RequestQueryBuilder;
		qb2 = RequestQueryBuilder.create();
		qb2.setJoin({field: "application"})
		qb2.setJoin({field: "author"})
		qb2.setFilter({field: "application.id", operator: "$eq", value: applicationId})

		const responses = await Promise.all([api.getApplication(applicationId, qb.query()), api.getApplicationComments(qb2.query())])
		console.log(responses)

		if (responses[0].status !== 200 || responses[1].status !== 200) {
			return {
				application: null,
				comments: null
			}
		}

		return {
			application: responses[0].data,
			comments: responses[1].data
		}
	} catch (e) {
		console.log(e);
		return {
			application: null,
			comments: null
		}
	}
}


const RecruitmentApplications = ({user, data}) => {
	const router = useRouter();

	useEffect(() => {
		console.log(data)
	}, [])

	return (
		/*<Row>
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Podanie na {data.application.position.role.name}a
							- {data.application.author.username}</Card.Title>

						<Row>
							<Col md={2} className={"text-center"}>
								<Row>
									<Col>
										<img
											width={100}
											height={100}
											src={`/avatars/${data.application.author.avatar}`}
											alt="Generic placeholder"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										{data.application.author.username}
									</Col>
								</Row>
							</Col>
							<Col md={10}>
								<Tabs defaultActiveKey="general">
									<Tab eventKey="general" title="Główne informacje">
										<br/>

										<Row>
											<Col>
												<p>Nazwa uzytkownika: <Badge
													variant={"secondary"}>{data.application.author.username}</Badge></p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Wiek: <Badge variant={"secondary"}>{data.application.age}</Badge></p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Doświadczenie: <div
													dangerouslySetInnerHTML={{__html: data.application.experience}}/>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>O sobie: <div
													dangerouslySetInnerHTML={{__html: data.application.description}}/>
												</p>
											</Col>
										</Row>
									</Tab>
									<Tab eventKey="steam" title="Steam">
										<br/>
										<Row>
											<Col>
												<img
													width={64}
													height={64}
													className="mr-3"
													src={data.application.steam_profile.avatar_medium}
													alt="Generic placeholder"
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Nazwa uzytkownika: <Badge
													variant={"secondary"}>{data.application.steam_profile.nickname}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>SteamID32: <Badge
													variant={"secondary"}>{data.application.steam_profile.steamid32}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>SteamID64: <Badge
													variant={"secondary"}>{data.application.steam_profile.steamid64}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Profil: <a
													href={`${data.application.steam_profile.url}`}>{data.application.steam_profile.url} </a>
												</p>
											</Col>
										</Row>
									</Tab>
									<Tab eventKey="steamrep" title="SteamRep">
										<br/>
										<Row>
											<Col>
												<iframe
													src={`https://steamrep.com/profiles/${data.application.steam_profile.steamid64}`}
													width={1000} height={500}/>
											</Col>
										</Row>
									</Tab>
								</Tabs>
							</Col>
						</Row>


					</Card.Body>
				</Card>
			</Col>
		</Row>*/
		<Row>
			<Col>
				<Card>
					<Card.Header>
						Podanie na {data.application.position.role.name} - {data.application.author.display_name}
					</Card.Header>
					<Card.Body>
						<Row>
							<Col md={2} className={"text-center"}>
								<Row>
									<Col>
										<img
											width={100}
											height={100}
											src={`/avatars/${data.application.author.avatar}`}
											alt="Generic placeholder"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										{data.application.author.username}
									</Col>
								</Row>
							</Col>
							<Col md={10}>
								<Tabs defaultActiveKey="general">
									<Tab eventKey="general" title="Główne informacje">
										<br/>

										<Row>
											<Col>
												<p>Nazwa uzytkownika: <Badge
													variant={"secondary"}>{data.application.author.username}</Badge></p>
											</Col>
										</Row>
										{data.application.questions_answers.length > 0 && (data.application.questions_answers.map(question_answer =>
											<Row>
												<Col>
													<p>{question_answer.question.question}: <Badge variant={"secondary"}>{question_answer.answer}</Badge></p>
												</Col>
											</Row>
										))}
									</Tab>
									<Tab eventKey="steam" title="Steam">
										<br/>
										<Row>
											<Col>
												<img
													width={64}
													height={64}
													className="mr-3"
													src={data.application.steam_profile.avatar_medium}
													alt="Generic placeholder"
												/>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Nazwa uzytkownika: <Badge
													variant={"secondary"}>{data.application.steam_profile.nickname}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>SteamID32: <Badge
													variant={"secondary"}>{data.application.steam_profile.steamid32}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>SteamID64: <Badge
													variant={"secondary"}>{data.application.steam_profile.steamid64}</Badge>
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p>Profil: <a
													href={`${data.application.steam_profile.url}`}>{data.application.steam_profile.url} </a>
												</p>
											</Col>
										</Row>
									</Tab>
									<Tab eventKey="steamrep" title="SteamRep">
										<br/>
										<Row>
											<Col>
												<iframe
													src={`https://steamrep.com/profiles/${data.application.steam_profile.steamid64}`}
													width={1000} height={500}/>
											</Col>
										</Row>
									</Tab>
								</Tabs>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}
export const getServerSideProps = withAuthServerSideProps(async (context) => getApplication(context));

export default RecruitmentApplications