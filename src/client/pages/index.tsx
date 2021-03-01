import React from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json();
    return {props: {data}}
}

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <h1>{data.msg}</h1>
}

export default Home