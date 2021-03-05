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