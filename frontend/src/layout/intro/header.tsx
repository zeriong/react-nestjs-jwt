import {Link, useSearchParams} from "react-router-dom";
import {sendLogout} from "../../store/slices/auth.slice";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {sendMyProfile} from "../../store/slices/user.slice";
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
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setOpenMenu(false);
            }
        }
        window.addEventListener('resize', handleResize);
        if (isLoggedIn) {
            dispatch(sendMyProfile());
        }
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [dispatch,isLoggedIn])

    const [openMenu, setOpenMenu]=useState(false);
    const menuHandler = () => {
        return openMenu ? setOpenMenu(false) : setOpenMenu(true);
    }

    return (
        <header className="flex justify-between max-lg:h-12 max-lg:px-5 items-center px-10 py-3 border-b border-gray-300 whitespace-nowrap
            fixed bg-white w-full z-30">
            <section
                className={
                    `${openMenu ? "opacity-50 visible" : "opacity-0 invisible"}
                    transition-all ease-in-out fixed w-full h-full bg-black opacity-0 left-0 top-0 duration-300 z-30`
                }
                onClick={() => setOpenMenu(false)}
            />
            <Link to="/" className="font-bold max-lg:text-lg text-[20px] mr-12">Zeriong Keep!</Link>
            <section
                className={
                `${openMenu ? "right-0" : "-right-full"}
                max-lg:fixed max-lg:h-full max-lg:bg-orange-50 max-lg:w-[260px] max-lg:bottom-0
                max-lg:p-7 max-lg:flex-col max-lg:ease-in-out max-lg:duration-300
                flex gap-8 justify-start w-full z-30`
            }>
                <div className="max-lg:block hidden font-bold border-b border-b-orange-200 pb-5 pl-2">
                    <div className="text-xl mb-2 text-gray-700">{isLoggedIn ? `${name}님` : "로그인해주세요."}</div>
                    {
                        isLoggedIn ? (
                            <>
                                <Link to='memo' className="flex ml-3 w-full text-orange-700 hover:scale-110 ease-in-out duration-150 py-1 px-2 hover:text-orange-900">
                                    Let's Keep!
                                </Link>
                                <button
                                    type="button"
                                    className="flex ml-3 w-full text-orange-500 hover:scale-110 ease-in-out duration-150 p-1 hover:text-orange-900"
                                    onClick={() => {
                                        dispatch(sendLogout())
                                        menuHandler();
                                    }}
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="flex ml-3 w-full text-orange-700 hover:scale-110 ease-in-out duration-150 p-1 hover:text-orange-900"
                                    onClick={() => setRouterQuery("modal","sign-in")}
                                >
                                    로그인
                                </button>
                                <button
                                    type="button"
                                    className="flex ml-3 w-full text-orange-500 hover:scale-110 ease-in-out duration-150 p-1 hover:text-orange-900"
                                    onClick={() => {setRouterQuery("modal","sign-up")}}
                                >
                                    회원가입
                                </button>
                            </>
                        )
                    }
                </div>
                <div className="flex max-lg:flex-col gap-8 max-lg:gap-5 text-lg font-bold justify-start w-full text-gray-700 ">
                    <Link to="/service" className="justify-start hover:scale-105 hover:text-orange-800 ease-in-out duration-150"
                          onClick={() => setOpenMenu(false)}>서비스</Link>
                    <Link to="/guide" className="justify-start hover:scale-105 hover:text-orange-800 ease-in-out duration-150"
                          onClick={() => setOpenMenu(false)}>기능안내</Link>
                    <Link to="/userExp" className="justify-start hover:scale-105 hover:text-orange-800 ease-in-out duration-150"
                          onClick={() => setOpenMenu(false)}>고객사례</Link>
                    <Link to="/payNotice" className="justify-start hover:scale-105 hover:text-orange-800 ease-in-out duration-150"
                          onClick={() => setOpenMenu(false)}>요금안내</Link>
                    <Link to="/notice" className="justify-start hover:scale-105 hover:text-orange-800 ease-in-out duration-150"
                          onClick={() => setOpenMenu(false)}>공지사항</Link>
                </div>
                <button
                    className={`${openMenu ? "block" : "hidden"}
                    flex justify-center absolute text-lg font-bold bottom-5 bg-orange-600 w-52 rounded-2xl p-1
                    text-white hover:scale-110 hover:bg-orange-300 hover:text-black ease-in-out duration-150`}
                    onClick={menuHandler}
                >
                    메뉴 숨기기
                </button>
            </section>
            {
                isLoggedIn ? (
                    <section className="max-lg:hidden flex flex-row items-center">
                        <div className='text-[20px] font-bold text-gray-600 mr-4'>{`${name}님`}</div>
                        <Link to='memo' className="w-auto flex justify-center cursor-pointer
                            rounded-2xl py-1 px-5 bg-orange-500 text-white mr-3" >
                            Let's Keep!
                        </Link>
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
                    <section className="max-lg:invisible flex gap-4 items-center m-auto font-medium ">
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
                className="bg-white p-[6px] rounded-lg border border-gray-200 left-3 hidden max-lg:block"
                onClick={menuHandler}
            >
                <GiHamburgerMenu size="20" color="#f97316"/>
            </button>
        </header>
    )
}