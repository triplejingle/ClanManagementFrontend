'use client'
import {useEffect} from "react";
import {fetchEvents} from "@/redux/event/eventThunks";
import {useAppDispatch} from "@/hooks/hooks";


export default function Home() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEvents())
    }, [])
  return (
    <main >
      Dashboard
    </main>
  )
}
