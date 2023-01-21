import React from "react";
import { useSelector} from "react-redux";
import { RootState} from "../../store";
import {Link} from "react-router-dom";

export const Profile = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));

    return ( loading ? (<div>로딩중...</div>) : (
            <>
                <div className="text-[24px] font-bold">{`이름: ${userState.name}`}</div>
                <div className="text-[24px] font-bold">{`이메일: ${userState.email}`}</div>
                <div className="text-[24px] font-bold">{`휴대전화번호: ${userState.mobile}`}</div>
                <Link to={'modify'}
                      className="mt-5 w-[180px] py-2 flex justify-center mb-3 cursor-pointer text-[22px]
                          items-center bg-orange-500 rounded-2xl text-white" >
                    회원정보 수정
                </Link>
            </>
        )
    )
};