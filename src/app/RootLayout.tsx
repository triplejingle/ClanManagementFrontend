import React, {Fragment, useEffect, useState} from "react";
import {HomeIcon} from "@heroicons/react/20/solid";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";

import {fetchAuthorization} from "@/redux/authorization/authorizationThunks";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectALlAuthorizations} from "@/redux/authorization/authorizationAdapter";
import Link from "next/link";

const navigation = [
    {name: 'events', href: 'events', icon: HomeIcon, current: true}
]
const teams = [

    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

type RootLayoutProps = {
    children: React.ReactNode;
}

export function RootLayout({children}: RootLayoutProps) {
    const {user, error, isLoading} = useUser();
    const dispatch = useAppDispatch();
    const role = useAppSelector(selectALlAuthorizations);

    useEffect(() => {
        if (user && role.length == 0) {
            dispatch(fetchAuthorization(user.sub as string));
        }
    }, [isLoading])

    return (
       <main className="py-10 ">
           <div className="px-4 sm:px-6 lg:px-8 ">
                <div className="bg-gray-900 rounded-lg">
                    <div className="mx-auto max-w-7xl">
                        <div className="bg-gray-900 py-10 ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
           {/*{!user&&<Link href="/api/auth/login">Click here to login</Link>}*/}
        </main>
    );
}