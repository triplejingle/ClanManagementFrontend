'use client'
import './globals.css'
import {Inter} from 'next/font/google'

import React, {Fragment, useState} from "react";
import {Dialog, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, Cog6ToothIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon, HomeIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {UserProvider, useUser} from '@auth0/nextjs-auth0/client';
import ProvidersComponent from "@/app/ProvidersComponent";
import {ToastContainer} from "react-toastify";
import ProfileDropDown from "@/app/profileDropDown";
import {RootLayout} from "@/app/RootLayout";

const navigation = [
    {name: 'events', href: '/events', icon: HomeIcon, current: true}
]
const teams = [
    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]
// const userNavigation = [
//     {name: 'Sign out', href: "/api/auth/logout"},
// ]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const inter = Inter({subsets: ['latin']})

export default function Layout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <ProvidersComponent>
            <html lang="en">
            <UserProvider>
                <head>
                    <meta name="description" content="Bingo application">
                    </meta>
                    <title>BE Active NL clan</title>
                </head>
                <body className={inter.className}>
                <RootLayout>{children}</RootLayout>

                </body>
            </UserProvider>
            </html>
        </ProvidersComponent>
    )
}
