import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {SignupModal} from "../modals/SignupModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {sendMyProfile, SET_USER} from "../store/slices/user.slice";
import {Link, useSearchParams} from "react-router-dom";
import {Api} from "../utile/api";
import {sendLogout, SET_LOGIN, SET_LOGOUT} from "../store/slices/auth.slice";

type FormData = {
    email: string;
    password: string;
};

export const Home = ()=> {
    /** 폼 컨트롤 */
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>({ mode: "onChange" });

    const [searchParams, setSearchParams] = useSearchParams();
    const [PwShow, setPwShow] = useState(false);
    //const navigate = useNavigate();

    /** 쿼리세팅 */
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
    }, [])

    /** submit */
    const onSubmit = handleSubmit(async () => {
        const {email,password} = getValues();
        await Api().post(
            '/auth/login',
            {
                email, password,
            },)
            .then((res) => {
                console.log(res.data);
                console.log(isLoggedIn);
                if (res.data.success) {
                    dispatch(SET_LOGIN(res.data.accessToken));
                    dispatch(SET_USER(res.data.user));
                } else {dispatch(SET_LOGOUT());}
            })
            .catch((e) => {
                console.log(e);
            });
    });

    return (
        <>
            <div className="bg-sky-100 w-full h-full flex-col justify-center text-center py-8 relative">
                <div
                    className="
                     flex flex-col justify-center absolute w-login top-1/2 left-1/2 -translate-x-1/2
                     -translate-y-1/2 bg-white py-8 px-5 rounded-2xl border-gray-300 border-2 shadow-md
                     "
                >
                    {
                        isLoggedIn ? (
                            <div className="flex flex-col">
                                <div className='text-2xl font-extrabold text-gray-600'>{`${userState.data.name}님 ㅎㅇ`}</div>
                                <Link to={'/profile'} className="border-8 border-sky-300 bg-sky-200 mt-3" >마이페이지</Link>
                                <button
                                    type="button"
                                    className="border-8 border-sky-300 bg-sky-200 mt-3"
                                    onClick={() => {
                                        console.log('클릭!')
                                        dispatch(sendLogout())
                                    }}
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className='text-2xl font-extrabold text-gray-600'>로그인</div>
                                <form
                                    className="flex flex-col mx-auto w-full justify-center text-center gap-y-4"
                                    onSubmit={onSubmit}
                                >
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-left">이메일</label>
                                        <input
                                            className="border border-gray-400 rounded px-2 py-1 w-full"
                                            type="text"
                                            id="email"
                                            placeholder="이메일을 입력해주세요."
                                            {...register("email", {
                                                required: true,
                                                minLength: 6, maxLength: 70,
                                                pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                                            })}
                                        />
                                        <p className="flex flex-start mt-1 text-red-500 text-xs font-normal h-3">
                                            {errors.email && '이메일을 입력해주시기 바랍니다.'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col mb-3">
                                        <label htmlFor="password" className="text-left">비밀번호</label>
                                        <input
                                            className="border border-gray-400 rounded px-2 py-1 w-full"
                                            {...register("password", { required: true,  minLength: 8, maxLength: 100 })}
                                            type={ PwShow ? "text" : "password" }
                                            id="password"
                                            placeholder="비밀번호를 입력해주세요."
                                        />
                                        <div className="flex justify-between">
                                            <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                                {errors.password && '비밀번호는 최소 8자 이상입니다.'}
                                            </p>
                                            <span onClick={()=>{setPwShow(!PwShow)}} className='cursor-pointer h-3 text-xs bg-gray-400 h-fit text-gray-100 px-2 mr-1'>
                                                { PwShow ? "비밀번호 숨김" : "비밀번호 확인" }
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-sky-200 border-4"
                                        type="submit"
                                    >
                                        로그인
                                    </button>
                                </form>
                                <span
                                    onClick={() => setRouterQuery("modal","sign-up")}
                                    className=" mt-5 bg-sky-200 border-4 flex justify-center mb-3 cursor-pointer"
                                >회원가입
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
            <SignupModal/>
        </>
    );
};