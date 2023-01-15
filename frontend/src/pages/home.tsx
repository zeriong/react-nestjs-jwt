import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {SignupModal} from "../modals/SignupModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {sendMyProfile, SET_USER} from "../store/slices/user.slice";
import {Link, useSearchParams} from "react-router-dom";
import {Api} from "../utile/api";
import {sendLogout, SET_LOGIN, SET_LOGOUT} from "../store/slices/auth.slice";
import {SigninModal} from "../modals/SigninModal";
import memoImg from "../styles/image/scroll-g6570d2351_1920.png";
import {SuccessSignupModal} from "../modals/SuccessSignupModal";

type FormData = {
    email: string;
    password: string;
};

export const Home = ()=> {
    /** 폼 컨트롤 */
    const {
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>({ mode: "onChange" });

    /** 쿼리세팅 */
    const [searchParams, setSearchParams] = useSearchParams();

    const setRouterQuery = (key: string, value:string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    /** state management */
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => (state.auth.data.isLoggedIn));
    const userState = useSelector((state: RootState) => (state.user));

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(sendMyProfile());
        }
    }, [dispatch])

    return (
        <>
            <header className="flex justify-between items-center px-10 py-3 border-b-2 whitespace-nowrap
            fixed bg-white w-full">
                <Link to="/" className="font-bold text-[20px]">Zerion Keep!</Link>
                <div className="flex gap-8 justify-start w-full pl-12">
                    <div className="cursor-pointer">서비스</div>
                    <div className="cursor-pointer">기능안내</div>
                    <div className="cursor-pointer">고객사례</div>
                    <div className="cursor-pointer">요금안내</div>
                    <div className="cursor-pointer">공지사항</div>
                </div>
                {
                    isLoggedIn ? (
                        <div className="flex flex-row items-center">
                            <div className='text-[20px] font-bold text-gray-600 mr-4'>{`${userState.data.name}님`}</div>
                            <Link to='dashboard' className="w-[100px] flex justify-center cursor-pointer
                            rounded-2xl p-1 bg-orange-500 text-white mr-3" >마이페이지</Link>
                            <button
                                type="button"
                                className="w-[100px] flex justify-center cursor-pointer
                                rounded-2xl border-[1px] border-gray-500 p-1"
                                onClick={() => {
                                    console.log('클릭!');
                                    dispatch(sendLogout())
                                }}
                            >
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4 items-center m-auto font-medium">
                        <div onClick={() => setRouterQuery("modal","sign-in")} className="w-[100px] flex justify-center cursor-pointer
                        rounded-2xl border-[1px] border-gray-500 p-1">
                            로그인하기
                        </div>
                        <div onClick={() => setRouterQuery("modal","sign-up")} className="w-[100px] flex justify-center cursor-pointer
                        rounded-2xl p-1 bg-orange-500 text-white">
                            회원가입
                        </div>
                    </div>
                    )
                }
            </header>
            <main className="flex w-full h-full overflow-hidden">
                <div className="flex h-full w-full py-[100px]">
                    <div className="flex flex-col w-auto h-auto m-auto p-[60px] font-bold text-[48px] text-gray-800">
                        <span className="mt-10">깔끔한 기록을 위한</span>
                        <span>메모 서비스</span>
                        <span>Zeriong Keep!</span>
                        {isLoggedIn ? (
                            <div className="flex flex-col mt-14">
                                <div className="flex text-[26px] font-bold justify-center">
                                    {`어서오세요! ${userState.data.name}님`}
                                </div>
                                <Link to="dashboard" className="text-[30px] font-bold flex py-2 px-5 items-center bg-orange-500
                                 rounded-2xl justify-center mt-8 cursor-pointer text-white">
                                    메모장 열기
                                </Link>
                            </div>
                        ) : (
                            <div className="text-[26px] font-medium mt-20">
                                자주 잊는 계획이나 일정관리, 정산관리 등<br/>
                                다양한 메모를 좀 더 깔끔하게 정리하세요.<br/>
                                가입하고 무료로 시작하세요.
                            </div>
                        )}
                        {
                            isLoggedIn ? (
                                <></>
                            ) : (
                                <div className="flex flex-row text-[30px] mt-10">
                                    <span onClick={() => setRouterQuery("modal","sign-in")}
                                          className="mt-5 w-[180px] py-2 flex justify-center border-[1px] border-gray-500
                                          mb-3 cursor-pointer text-[22px] items-center mr-6 rounded-2xl">
                                        로그인하기
                                    </span>
                                    <span onClick={() => setRouterQuery("modal","sign-up")}
                                          className="mt-5 w-[180px] py-2 flex justify-center mb-3 cursor-pointer text-[22px]
                                           items-center bg-orange-500 rounded-2xl text-white">
                                        회원가입
                                    </span>
                                </div>)
                        }
                    </div>
                    <div className="flex items-center w-7/12 h-full font-bold text-[48px] text-gray-800">
                        <img className="flex m-auto h-[600px]" src={memoImg}/>
                    </div>
                </div>
            </main>
            <SuccessSignupModal/>
            <SignupModal/>
            <SigninModal/>
        </>
    );
};