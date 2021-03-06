import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps, withAuthComponent} from "../../../../hocs/withAuth";
export const getServerSideProps = withAuthServerSideProps();
import * as querystring from 'query-string';
import {useRouter} from "next/router";
import axios from "axios";

const ConnectAccountSteamCallback = ({user}: { user: any }) => {
    const router = useRouter()
    useEffect(() => {
    })

    return (
        <div>Połączono</div>
    )
}

export default withAuthComponent(ConnectAccountSteamCallback);