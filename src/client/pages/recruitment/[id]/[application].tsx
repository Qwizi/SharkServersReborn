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


export const getServerSideProps = withAuthServerSideProps(async (context) => {
	try {
		const applicationResponse = await api.getRecruitmentApplication(context.params.application);
		console.log(applicationResponse.data);
		return {
			application: applicationResponse.data,
		}
		return {application: null}
	} catch (e) {
		console.log(e);
		return {
			props: {
				application: null,
			}
		}
	}
});

const RecruitmentApplications = ({user, data}) => {
	const router = useRouter();
	useEffect(() => {
		console.log(router.query);

	})

	if (!data.application) return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Nie znaleziono</Card.Title>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)

	return (
		<Row>
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
		</Row>
	)
}

export default RecruitmentApplications