import {Alert, Card, Col, Row} from "react-bootstrap";
import React from "react";

export const RecruitmentPositionsEmpty = () => {
	return (
		<Row>
			<Col>
				<Card>
					<Card.Header>
						Rekrutacja
					</Card.Header>
					<Card.Body>
						<Alert variant={"info"}>
							<h2>Aktualnie nie prowadzimy rekrutacji</h2>
							<h4>Zajrzyj tutaj za jakiś czas</h4>
						</Alert>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}