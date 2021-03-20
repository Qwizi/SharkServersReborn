import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {useRouter} from "next/router";
import Head from 'next/head'

export const RecruitmentApplicationsTable = ({applications}) => {
	const router = useRouter();
	if (!applications || !applications.data) return <div/>
	return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<Row>
							<Col>
								<Card.Title>Podania</Card.Title>
								<Table responsive className={"table-hover"}>
									<thead>
									<th>Nick</th>
									<th>SteamID32</th>
									<th>Wiek</th>
									<th>Status</th>
									</thead>
									<tbody>
									{applications.data.map(application =>
										<tr onClick={() => router.push(`/recruitment/${router.query.id}/${application.id}`)}>
											<td>{application.author.username}</td>
											<td>{application.steam_profile.steamid32}</td>
											<td>{application.age}</td>
											<td>{application.status}</td>
										</tr>
									)}
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