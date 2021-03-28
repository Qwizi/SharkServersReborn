import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {useRouter} from "next/router";
import Head from 'next/head'
import Image from 'next/image';

export const RecruitmentApplicationsTable = ({roleName, applications}) => {
	const router = useRouter();

	return (
		<Row>
			<Col>
				<Card>
					<Card.Header>Podania - {roleName}</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<Table responsive className={"table-hover text-center"}>
									<thead>
										<th>Użytkownik</th>
										<th>Komentarze</th>
										<th>Ostatni komentarz</th>
										<th>Status</th>
									</thead>
									<tbody>
									{applications.count > 0
										? (
											(applications.data.map(application =>
												<tr onClick={() => router.push(`/recruitment/position-${roleName}/application-${application.id}`)}>
													<td>
														<Row>
															<Col>
																<Image src={`/avatars/${application.author.avatar}`} alt={application.author.display_name} height={64} width={64}/>
															</Col>
														</Row>
														<Row>
															<Col>
																<span style={{color: application.author.roles[0].color}}><span dangerouslySetInnerHTML={{__html: application.author.display_name}}/></span>
															</Col>
														</Row>
														</td>
													<td>0</td>
													<td>Brak</td>
													<td>{application.status}</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan={4}>Brak</td>
											</tr>
										)

									}
									</tbody>
								</Table>
							</Col>
						</Row>
						<br/>
						<Row className={"text-right"}>
							<Col>
								<Button variant={"primary"}
										onClick={() => router.push(`/recruitment/${router.query.id}/new`)}>Napisz
									podanie</Button>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}