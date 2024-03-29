import React, {useContext, useEffect, useState} from "react";
import {Badge, Button, Card, Col, Fade, ListGroup, ProgressBar, Row} from "react-bootstrap";
import {SocketContext} from "../../context/socket.context";

export const ServerCard = ({
								socket,
							   name,
							   ip,
							   port,
							   playersCount,
							   maxPlayers,
							   status,
							   map,
							   onConnectBtnClick,
							   events,
							   updateServer,
							   updateServerName,
							   updateServerPlayersCount
						   }) => {

	useEffect(() => {
		console.log(events);
		socket.emit("get_server_data_from_cache", {ip, port})
		//updateServerName(ip, port, '100% crits')
		//updateServerPlayersCount(ip, port, 16)
		//socket.on("get_server_data_from_cache", async data => getServerDataFromCache(data))
	}, [])

	useEffect(() => {
		socket.on("get_server_data_from_cache", async data => await getServerDataFromCache(data))
		socket.on("server_events", async data => await handleServerEvents(data))
	}, [socket])

	const getServerDataFromCache = async (data) => {
		if (data?.map) {
			console.log(data.players)
			updateServer(data.ip, data.port, data)
		}
	}

	const handleServerEvents = async (data) => {
		if (data?.event && data?.server) {
			const {event, server} = data;

			switch (event.type) {
				case 'player_connected':
					console.log(event)
					updateServer(server.ip, server.port, server)
					break;
				case 'player_disconnected':
					console.log(event)
					updateServer(server.ip, server.port, server)
					break;
				case 'player_change_team':
					console.log(event)
					updateServer(server.ip, server.port, server)
					break;
				case 'player_change_class':
					console.log(event)
					updateServer(server.ip, server.port, server)
					break;
				case 'time':
					console.log(event)
					updateServer(server.ip, server.port, server)
					break;
			}
		}

	}


	return (
		<Card className="text-center">
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>{ip}:{port}</Card.Subtitle>
				<Row>
					<Col>
						{playersCount && maxPlayers ? (
							<ProgressBar now={(playersCount / maxPlayers) * 100}
										 label={`${(playersCount / maxPlayers) * 100} %`}/>
						) : (
							<ProgressBar now={0} label={`0 %`}/>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{status ? (<Badge variant={"success"}>Online</Badge>) : (
							<Badge variant={"danger"}>Offline</Badge>)}
					</Col>
					<Col>
						<Badge variant={"secondary"}>{playersCount}/{maxPlayers}</Badge>
					</Col>
					<Col>
						<Badge variant={"secondary"}>{map}</Badge>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button onClick={onConnectBtnClick} variant="success" size={"sm"}>Polacz</Button>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<ListGroup variant="flush">
							{events && events.length > 0 && events.map(event =>
								<Fade in={!!event}>
									<ListGroup.Item>{event.player_name} dolączyl na serwer</ListGroup.Item>
								</Fade>
							)}
						</ListGroup>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}