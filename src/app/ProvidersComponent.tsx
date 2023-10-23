'use client'

import {store} from '@/redux/clanmanagementstore';
import React, {HTMLAttributes} from 'react';

import {Provider} from "react-redux";

interface ProvidersComponentProps extends React.HTMLAttributes<HTMLDivElement> {

}

const ProvidersComponent = ({children}: HTMLAttributes<HTMLDivElement>) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ProvidersComponent;