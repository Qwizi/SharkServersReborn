import React from 'react'
import { NextPage } from 'next'
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async (context) => {
    const data = {
        //user: context.req.user || null
    }
    return {props: {data}}
}

const Index: ({data}: InferGetServerSidePropsType<() => Promise<{ props: { data: any } }>>) => JSX.Element = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <h1>{JSON.stringify(data)}</h1>
}

export default Index