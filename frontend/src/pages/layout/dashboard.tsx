import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMyProfile} from "../../store/slices/user.slice";
import {AppDispatch, RootState} from "../../store";
import {Outlet} from "react-router-dom";
import {Header} from "./header";
import {Aside} from "./aside";

export const Dashboard = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(sendMyProfile());
    }, [dispatch])

    return ( loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
        <>
            <Header/>
            <Aside/>
            <Outlet/>
        </>
        )
    )
};