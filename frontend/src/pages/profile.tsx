import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMyProfile} from "../store/slices/user.slice";
import {AppDispatch, RootState} from "../store";
import {Link} from "react-router-dom";

export const Profile = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));
    const dispatch = useDispatch<AppDispatch>();

    const test = true;
    const consol = () => {
        console.log(userState);
    }
    const noConsol = () => {
        console.log(test);
    }

    useEffect(() => {
        dispatch(sendMyProfile());
    }, [dispatch])

    return ( loading ? (<div>로딩중...</div>) : (
        <>
            <div className="flex flex-col gap-5 flex justify-center items-center">
                <h1>{`이름: ${userState.name}님`}</h1>
                <p>{`이메일: ${userState.email}`}</p>
                <p>{`휴대전화번호: ${userState.mobile}`}</p>
                <Link to={'/profile/modify'} className="border-8 border-sky-300 bg-sky-200 w-60 text-center" >회원정보 수정</Link>
            </div>
        </>
        )
    )
};