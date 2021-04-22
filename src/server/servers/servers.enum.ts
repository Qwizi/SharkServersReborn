export enum ServerEvents {
	PLAYER_CONNECTED = 'player_connected',
	PLAYER_DISCONNECTED = 'player_disconnected',
	PLAYER_CHANGE_TEAM = 'player_change_team',
	PLAYER_CHANGE_CLASS = 'player_change_class',
	PLAYER_KILL = 'player_kill',
	PLAYER_DEAD = 'player_dead',
	MAP_CHANGED = 'map_changed',
	TIME = 'time',
}

export enum TFTeams {
	BLUE = 'blue',
	RED = 'red'
}

export enum TFClassName {
	SCOUT = 'scout',
	SNIPER = 'sniper',
	SOLDER = 'soldier',
	SPY = 'spy',
	DEMOMAN = 'demoman',
	HEAVY = 'heavy',
	PYRO = 'pyro',
	MEDIC = 'medic',
	ENGINEER = 'enginner'
}

export enum TFStats {
	kills = 'kills',
	deaths = 'deaths',
	assists = 'assists',
	score = 'score'
}