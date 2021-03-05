import {useEffect} from "react";
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
        if(!user){
            return <h1>Denied</h1> // or redirect, we can use the Router because we are client side here
        }
        return <Component {...data.props}/>
    }
}