import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps, withAuthComponent} from "../../../hocs/withAuth";
import {withSteamProfileComponent} from "../../../hocs/withSteamProfile";
import {Badge, Button, Card, Col, Form, ListGroup, Media, Nav, ProgressBar, Row, Table} from "react-bootstrap";
import api from "../../../uitils/api";
import {useRouter} from "next/router";
import {News} from "../../../components/index/news.component";
import {NewsCard} from "../../../components/index/newsCard.component";
import Link from "next/link";
import {RecruitmentCard} from "../../../components/recruitment/recruitmentCard.component";
import {RecruitmentApplicationsTable} from "../../../components/recruitment/recruitmentApplicationsTable";


export const getServerSideProps = withAuthServerSideProps(async (context, user) => {
	try {
		const values =  await Promise.all([api.getRecruitmentPositions(), api.getRecruitmentApplications({
			"position.role.name": context.req.query.id
		})]);
		console.log(values);
		return {
			props: {
				positions: values[0].data,
				applications: values[1].data
			}
		}

	} catch (e) {
		console.log(e);
		return {props: {
				positions: null,
				applications: null
			}}
	}
});


const RecruitmentNewApplication = ({user, data}) => {
	const [experience, setExperience] = useState('')
	const [description, setDescription] = useState('')
	const [age, setAge] = useState(14)
	const [btnStatus, setBtnStatus] = useState(true)

	const router = useRouter();

	useEffect(() => {
		console.log(user)
	}, [])

	const sendApplication = async (e) => {
		try {
			e.preventDefault();
			const response = await api.sendRecruitmentApplication({
				position: data.position.id,
				experience: experience,
				description: description,
				age: age
			})
			if (response.status === 201) {
				await router.push(`/recruitment/${router.query.id}/${response.data.id}`)
			}
		} catch (e) {
			console.log(e);
		}
	}

	if (!data  || !user) return <div/>

	return (
		<Row className={"justify-content-md-center"}>
			<Col>
				<Card>
					<Card.Body>
						<Row>
							<Col md={2} className={"text-center"}>
								<Row>
									<Col>
										<img
											width={100}
											height={100}
											src={`/avatars/${user.avatar}`}
											alt="Generic placeholder"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<span style={{color: user.roles[0].color}}>{user.username}</span>
									</Col>
								</Row>
							</Col>
							<Col md={10}>
								<h5>Wyslij podanie na stanowisko {router.query.id}</h5>
								<Row>
									<Col md={6}>
										<Form method={"post"} onSubmit={sendApplication}>
											<Form.Group controlId="formUsername">
												<Form.Label>Doświadczenie</Form.Label>
												<Form.Control
													as={"textarea"}
													required={true}
													placeholder="Doświdczenie"
													value={experience}
													onChange={(e) => setExperience(e.target.value)}
												/>
											</Form.Group>
											<Form.Group controlId="formUsername">
												<Form.Label>Dlaczego to wlasny ty nadajesz sie na podane
													stanowisko?</Form.Label>
												<Form.Control
													as={"textarea"}
													required={true}
													placeholder="Dlaczego to wlasny ty nadajesz sie na podane
													stanowisko?<"
													value={description}
													onChange={(e) => setDescription(e.target.value)}
												/>
											</Form.Group>
											<Form.Group controlId="formUsername">
												<Form.Label>Wiek</Form.Label>

												<Form.Control
													min={14}
													max={40}
													type={"number"}
													required={true}
													placeholder="Dlaczego to wlasny ty nadajesz sie na podane
													stanowisko?<"
													value={age}
													onChange={(e) => setAge(parseInt(e.target.value))}
												/>
											</Form.Group>
											<Button type={'submit'} variant={"success"}>Napisz</Button>
										</Form>
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default withAuthComponent(RecruitmentNewApplication)