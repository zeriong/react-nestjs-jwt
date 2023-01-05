import React from "react";
import {useSelector} from "react-redux";
import {userState} from "../store/slices/userInfo";
import {RootState} from "../store";

export const UserDetail = () => {
    const userState = useSelector((state: RootState) => (state.user.info));
    const test = true;
    const consol = () => {
        console.log(userState);
    }
    const noConsol = () => {
        console.log(test);
    }

    return (
        <div>
            <h1>ghhhhhhhhhhhhhhh</h1>
            <div onClick={test ? consol : noConsol}>11111111111111</div>
            <h1>{`안녕하세요 ${userState.name}`}</h1>
            <p>{`이메일: ${userState.email}`}</p>
            <p>{`휴대전화번호: ${userState.mobile}`}</p>
            <p>{`비밀번호: ${userState.password} 암호화 되었습니다.`}</p>
        </div>
    )
};