import React, {useEffect, useState} from 'react'
import {withAuthServerSideProps, withAuthComponent} from "../../../../hocs/withAuth";
export const getServerSideProps = withAuthServerSideProps();
import redirect from 'nextjs-redirect';
import {useRouter} from "next/router";

const Redirect = redirect(``)

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