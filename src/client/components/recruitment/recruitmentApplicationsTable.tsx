import {Card, Col, Row, Table} from "react-bootstrap";
import {useRouter} from "next/router";

export const RecruitmentApplicationsTable = ({applications}) => {
	const router = useRouter();
	return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Podania</Card.Title>
						<Table responsive>
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
									<td>{application.author.steam_profile.steamid32}</td>
									<td>{application.age}</td>
									<td>{application.status}</td>
								</tr>
							)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}