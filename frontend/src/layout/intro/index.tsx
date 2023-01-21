import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {sendMyProfile} from "../../store/slices/user.slice";
import {Link, Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {Header} from "./header";

export const HomeLayout = ()=> {
    /** 쿼리세팅 */
    const [searchParams, setSearchParams] = useSearchParams();

    const setRouterQuery = (key: string, value:string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    /** state management */
    const dispatch = useDispatch<AppDispatch>();
    const { data:{ isLoggedIn }, loading} = useSelector((state: RootState) => (state.auth));
    const { data: { name } } = useSelector((state: RootState) => (state.user));

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(sendMyProfile());
        }
    }, [dispatch])

    return ( loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
        <>
            <Header/>
            <main className="flex w-full h-full overflow-hidden pt-[60px]">
                <Outlet/>
            </main>
        </>
        )
    );
};