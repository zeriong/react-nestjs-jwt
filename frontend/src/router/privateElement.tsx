import {Navigate, useLocation} from "react-router-dom";
import {RootState} from "../store";
import React from "react";
import {useSelector} from "react-redux";

interface PrivateRouterProps {
    children? : React.ReactElement;
}

export const PrivateElement = ({children}: PrivateRouterProps) : React.ReactElement => {
    const { data: {isLoggedIn} } = useSelector((state: RootState) => (state.auth));
    let location = useLocation();

    console.log('프라이빗 접근!!!!');
    if (isLoggedIn) {
        console.log('로그인 확인');
        return children
    } else {
        return <Navigate to={'/'} state={{ from: location }}/>
    }
};