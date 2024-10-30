"use client";

import {Provider} from "react-redux";
import React, {Suspense} from "react";
import {reduxStore} from "@/lib/redux/store";

export const Providers = (props: React.PropsWithChildren) => {
    return <Provider store={reduxStore}>
        {props.children}
    </Provider>;
};