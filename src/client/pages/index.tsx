import React, {useEffect} from 'react'
import {withAuthServerSideProps} from "../hocs/withAuth";

export const getServerSideProps = withAuthServerSideProps();

const Index = ({user}: {user:any}) => {
    return <h1>{user && (user.username)}</h1>
}



export default Index