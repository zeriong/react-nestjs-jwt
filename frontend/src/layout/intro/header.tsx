import {Link, useSearchParams} from "react-router-dom";
import {sendLogout} from "../../store/slices/auth.slice";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {sendMyProfile} from "../../store/slices/user.slice";
import {FcMenu} from "@react-icons/all-files/fc/FcMenu";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu";

export const Header = ()=> {
    /** 쿼리세팅 */
    const [searchParams, setSearchParams] = useSearchParams();

    const setRouterQuery = (key: string, value:string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    /** state management */
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => (state.auth.data.isLoggedIn));
    const { data: { name } } = useSelector((state: RootState) => (state.user));

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(sendMyProfile());
        }
    }, [dispatch,isLoggedIn])

    const [openMenu, setOpenMenu]=useState(false);
    const menuHandler = () => {
        return openMenu ? setOpenMenu(false) : setOpenMenu(true);
    }

    return (
        <header className="flex justify-between max-md:h-14 max-md:px-5 items-center px-10 py-3 border-b-2 whitespace-nowrap
            fixed bg-white w-full">
            <section
                className={
                    `${openMenu ? "opacity-50 visible" : "opacity-0 invisible"}
                    transition-all ease-in-out fixed w-full h-full bg-black opacity-0 left-0 top-0 duration-300 z-20`
                }
                onClick={() => setOpenMenu(false)}
            />
            <Link to="/" className="font-bold max-md:text-lg text-[20px]">Zeriong Keep!</Link>
            <section
                className={
                `${openMenu ? "right-0" : "-right-full"}
                max-md:fixed max-md:h-full max-md:bg-orange-500 max-md:w-auto max-md:bottom-0
                max-md:p-5 max-md:flex-col max-md:ease-in-out max-md:duration-300
                flex gap-8 justify-start w-full pl-12 z-30`
            }>
                <div className="cursor-pointer">서비스</div>
                <div className="cursor-pointer">기능안내</div>
                <div className="cursor-pointer">고객사례</div>
                <div className="cursor-pointer">요금안내</div>
                <div className="cursor-pointer">공지사항</div>
            </section>
            {
                isLoggedIn ? (
                    <section className="flex flex-row items-center">
                        <div className='text-[20px] font-bold text-gray-600 mr-4'>{`${name}님`}</div>
                        <Link to='memo' className="w-[100px] flex justify-center cursor-pointer
                            rounded-2xl p-1 bg-orange-500 text-white mr-3" >마이페이지</Link>
                        <button
                            type="button"
                            className="w-[100px] flex justify-center cursor-pointer
                                rounded-2xl border-[1px] border-gray-500 p-1 "
                            onClick={() => {
                                dispatch(sendLogout())
                            }}
                        >
                            로그아웃
                        </button>
                    </section>
                ) : (
                    <section className="flex gap-4 items-center m-auto font-medium">
                        <div onClick={() => setRouterQuery("modal","sign-in")} className="w-[100px] flex justify-center cursor-pointer
                        rounded-2xl border-[1px] border-gray-500 p-1">
                            로그인하기
                        </div>
                        <div onClick={() => setRouterQuery("modal","sign-up")} className="w-[100px] flex justify-center cursor-pointer
                        rounded-2xl p-1 bg-orange-500 text-white">
                            회원가입
                        </div>
                    </section>
                )
            }
            <button
                type="button"
                className="bg-white p-2 rounded-xl border border-gray-200 left-3 invisible max-md:visible"
                onClick={menuHandler}
            >
                <GiHamburgerMenu size="22" color="#f97316"/>
            </button>
        </header>
    )
}