'use client'
import {useEffect} from "react";
import {fetchEvents} from "@/redux/event/eventThunks";
import {useAppDispatch} from "@/hooks/hooks";
import {useUser} from "@auth0/nextjs-auth0/client";
import {default as axios} from "axios/index";
import {GetRole} from "@/app/Auth0";


export default function Home() {
    const dispatch = useAppDispatch();
    const { user, error, isLoading } = useUser();
    useEffect(() => {

            dispatch(fetchEvents())

    }, [])


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    return (
    <main >
        {JSON.stringify(user)}
       Welcome {user?.name}
    </main>
  )
}
