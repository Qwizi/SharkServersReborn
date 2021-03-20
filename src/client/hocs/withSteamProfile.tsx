import {useEffect} from "react";
import {useRouter} from "next/router";

export function withSteamProfileComponent(Component: any){

	return ({user, data}:{user: any, data: any}) => {
		const router = useRouter();
		useEffect(() => {
			if (!user || !user.steam_profile) router.push('/profile/connectedAccounts');
		}, []);

		if(!user || !user.steam_profile){
			return <h1>Steam account not connected</h1>
		}
		return <Component {...data.props}/>
	}
}