import {useEffect} from "react";
import {useRouter} from "next/router";
export function withAuthServerSideProps(getServerSidePropsFunc?: Function){
    return async (context: any) => {
        const user = context.req.user || null;
        if(getServerSidePropsFunc){
            return {props: {user, data: await getServerSidePropsFunc(context, user)}};
        }
        return {props: {user, data: {props: {user}}}};
    }
}

export function withAuthComponent(Component: any){

    return ({user, data}:{user: any, data: any}) => {
        const router = useRouter();
        useEffect(() => {
            if (!user) router.push('/auth/login');
        }, []);

        if(!user){
            return <h1>Not authorized</h1> // or redirect, we can use the Router because we are client side here
        }
        return <Component {...data.props}/>
    }
}