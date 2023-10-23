import React, {Fragment, useEffect, useState} from "react";
import {HomeIcon} from "@heroicons/react/20/solid";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from "next/navigation";

import {fetchAuthorization} from "@/redux/authorization/authorizationThunks";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectALlAuthorizations} from "@/redux/authorization/authorizationAdapter";

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
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const {user, error, isLoading} = useUser();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const role = useAppSelector(selectALlAuthorizations);

    useEffect(() => {
        if (user && role.length == 0) {
            dispatch(fetchAuthorization(user.sub as string));
        }
    }, [isLoading])

    if (isLoading)
        return <>Loading please wait</>
    if (!user) {
        router.push("/api/auth/login");
        return <>Not logged in redirecting to login</>
    }
    if (role.length == 0)
        return <></>

    if (role.find(r => r.name == "Admin") == undefined) {
        return <a href={"/api/auth/logout"}>401 No Access Allowed click here to logout. Wait to get access or check your
            mail to verify your email.</a>
    }

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
        </main>
    );
}