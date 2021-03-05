import React, {useEffect} from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'
import {withAuthServerSideProps} from "../hocs/withAuth";
import axios from "axios";
import {useRouter} from "next/router";

export const getServerSideProps = withAuthServerSideProps();

const Logout = ({user}: {user:any}) => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await logout();
        })();
    }, [router.pathname]);

    const logout = async () => {
        try {
            const response = await axios.post('/api/auth/logout');
            if (response.status === 201) {
                await router.push('/', undefined, {shallow: true});
            }
        } catch (e) {
            console.log(e);
            await router.push('/', undefined, {shallow: true});
        }

    }
    return <div/>
}



export default Logout