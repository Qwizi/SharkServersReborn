import {Badge, Button, Card, Col, ProgressBar, Row, Table} from "react-bootstrap";
import {ServerCard} from "./serverCard.component";
import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faServer, faBell} from '@fortawesome/free-solid-svg-icons'
import io from "socket.io-client";
import {RequestQueryBuilder} from "@nestjsx/crud-request";
import api from "../../uitils/api";
import {withAuthServerSideProps} from "../../hocs/withAuth";
import {SocketContext} from "../../context/socket.context";


export const Servers = ({data}) => {
	const [servers, setServers] = useState<object[] | []>([]);
	const [events, setEvents] = useState<object[] | []>([]);
	const [statusCount, setStatusCount] = useState<object[] | []>([])
	//const [statusCount, setStatusCount] = useState(0);

	const server = {
		ip: "245.234.211.24",
		port: 5000,
		name: "Jailbreak",
		players: 0,
		max_players: 16,
		map: 'ba_jail',
		timeleft: 0
	}

	const socket = useContext(SocketContext);
	const serverSocket = io("http://localhost:5000/webclient")

	useEffect(() => {
		data.data.map(server => {
			server.stats = {}
		})
		setServers(data.data);

		socket.on("connect", () => {
			console.log('Webclient Connected')
			socket.emit('join', {room: 'webclient'})
		});

		serverSocket.on("connect", () => {
			console.log(`Server ${server.name} Connected`)
			serverSocket.emit('join', {room: 'servers'})
		});

		serverEvents();

	}, [])


	const updateServer = async (ip: string, port: number, data: any) => {
		let newServers = [...servers]
		let [server, serverIndex] = findServer(ip, port)
		if (server && serverIndex !== -1) {
			server.stats = data;
			// @ts-ignore
			newServers[serverIndex] = server;
			setServers(newServers);
		}
	}

	const updateServerName = (ip: string, port: number, name: string) => {
		return updateServer(ip, port, {name: name, ...data});
	}
	const updateServerPlayersCount = (ip: string, port: number, players: number) => {
		return updateServer(ip, port, {players: players, ...data});
	}

	const findServer = (ip: string, port: number) => {
		// @ts-ignore
		const obj = servers.find(server => server.ip == ip && server.port == port)
		const index = servers.findIndex(server => server.ip == ip && server.port == port)
		return [obj, index]
	}

	const findServerIndex = (ip: string, port: number) => {
		return servers.findIndex(server => server.ip == ip && server.port == port)
	}

	const serverEvents = () => {

		/*serverSocket.emit("send_server_data_to_cache", server);*/

		setInterval(() => {
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'player_disconnected',
						player: {username: 'Qwizi'}
					}
				}
			)
		}, 6000)

		setInterval(() => {
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'player_connected',
						player: {username: 'Qwizi'}
					}
				}
			)
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'player_connected',
						player: {username: 'Qwizi'}
					}
				}
			)
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'player_connected',
						player: {username: 'Qwizi'}
					}
				}
			)
		}, 5000)


		setInterval(() => {
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'map_changed',
						map: 'ba_jail_2'
					}
				}
			)
		}, 7000)

		setInterval(() => {
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'time',
						timeleft: 0
					}
				}
			)
		}, 60000)

		/*setInterval(() => {
			const events = ['player_connected', 'player_disconnected']
			serverSocket.emit("server_events", {
					server: {
						ip: server.ip,
						port: server.port,
					},
					event: {
						type: 'player_disconnected',
						player: {username: 'Qwizi'}
					}
				}
			)
		}, [getRandomInt(1000, 5000)])*/
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function start(socket, data2, counter) {
		if (counter < 15) {
			setTimeout(function () {
				counter++;
				console.log(counter);
				socket.emit('get_data', {...data2, players: getRandomInt(0, 20)});
				start(socket, data2, counter);
			}, 1000);
		}
	}

	return (
		<Row>
			<Col>
				<h4><FontAwesomeIcon icon={faServer}/> Serwery</h4>
				{servers && servers.length > 0 && servers.map(server =>
					<Row>
						<Col>
							<ServerCard
								name={server?.stats?.name ? server.stats.name : server.name}
								ip={server?.ip ? server.ip : ''}
								port={server?.port ? server.port : ''}
								players={server?.stats.players ? server.stats.players : 0}
								maxPlayers={server?.stats?.max_players ? server.stats.max_players : 0}
								map={server?.stats?.map ? server.stats.map : 'none'}
								status={!!server.stats?.map}
								events={events.filter(e => e.ip == server.ip && e.port == server.port)}
								updateServer={updateServer}
								updateServerPlayersCount={updateServerPlayersCount}
								updateServerName={updateServerName}
							/>
							<br/>
						</Col>
					</Row>
				)}
			</Col>
		</Row>
	)
}