import {Badge, Card, Col, Nav, Row, Table} from "react-bootstrap";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {RecruitmentPositionsEmpty} from "./recruitmentPostionsEmptyCard.component";

export const RecruitmentCard = ({positions}) => {
	const router = useRouter()

	if (positions.count === 0) return <RecruitmentPositionsEmpty/>;

	return (
		<Row>
			<Col>
				<Card>
					<Card.Header>Rekrutacja</Card.Header>
					<Card.Body>
						<Table responsive className={"table-hover text-center"}>
							<thead>
								<th>Stanowisko</th>
								<th>Wolnych miejsc</th>
								<th>Razem</th>
								<th>Otwarte</th>
								<th>Przyjęte</th>
								<th>Odrzucone</th>
							</thead>
							<tbody>
								{positions.data && positions.data.map(position =>
									<tr key={position.id} onClick={() => router.push(`/recruitment/position-${position.role.name}`)}>
										<td>{position.role.name}</td>
										<td>{position.free_space}</td>
										<td>
											3
										</td>
										<td>
											<Badge variant={"secondary"}>1</Badge>
										</td>
										<td>
											<Badge variant={"success"}>1</Badge>
										</td>
										<td>
											<Badge variant={"danger"}>1</Badge>
										</td>
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