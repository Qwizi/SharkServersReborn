import React, {useEffect} from 'react'
import {withAuthServerSideProps, withAuthComponent} from "../../hocs/withAuth";

export const getServerSideProps = withAuthServerSideProps();

const ProfileIndex = ({user}: {user:any}) => {
    return <h1>{user && (user.username)}</h1>
}

export default withAuthComponent(ProfileIndex);