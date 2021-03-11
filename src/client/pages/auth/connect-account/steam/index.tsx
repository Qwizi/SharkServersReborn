import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps, withAuthComponent} from "../../../../hocs/withAuth";
export const getServerSideProps = withAuthServerSideProps();
import {useRouter} from "next/router";

const ConnectAccountSteam = ({user}: { user: any }) => {
    const router = useRouter()

    useEffect(() => {
        router.push('/api/auth/connect-account/steam')
    }, [])
    return (
        <div>
            Przenosze na strone steam
        </div>
    )
}

export default withAuthComponent(ConnectAccountSteam);