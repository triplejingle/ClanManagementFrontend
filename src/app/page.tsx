'use client'
import React, {useEffect} from "react";
import {fetchEvents} from "@/redux/event/eventThunks";
import {useAppDispatch} from "@/hooks/hooks";
import {UserProvider, useUser} from "@auth0/nextjs-auth0/client";

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
export default  withPageAuthRequired(function Home() {
    const dispatch = useAppDispatch();
    const {user, error, isLoading} = useUser();
    useEffect(() => {
        dispatch(fetchEvents())
    }, [])

    return (
        <main className={"ml-10"}>
            <div>Welcome {user?.name}</div>
        </main>
    )
});
