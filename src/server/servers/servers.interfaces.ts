import { TFClassName, TFStats, TFTeams } from "./servers.enum";

export interface IPlayer {
	steamid64: string;
	username: string;
	team?: TFTeams;
	class_name?: TFClassName;
	stats?: TFStats
}

export interface IServerCacheData {
	name: string;
	playersCount: number;
	max_players: number;
	map: string;
	timeleft: string;
	players: IPlayer[] | []
}