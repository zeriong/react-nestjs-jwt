import {Navigate, Outlet, useLocation} from "react-router-dom";
import {store} from "../store";
import React from "react";

interface PrivateRouterProps {
    children? : React.ReactElement;
    isLoggedIn : boolean;
}

export const PrivateElement = ({isLoggedIn}: PrivateRouterProps) : React.ReactElement => {
    let location = useLocation();
    console.log('프라이빗 접근!!!!');
    if (isLoggedIn) {
        console.log('로그인 확인');
        return <Outlet/>
    } else {
        return <Navigate to={'/'} state={{ from: location }}/>
    }
};