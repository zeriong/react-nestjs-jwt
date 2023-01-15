import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {sendMyProfile} from "../../store/slices/user.slice";

export const DashboardMain = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));
    return (
        loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
            <div className="flex flex-col justify-center h-full text-center items-center pt-[60px] pl-[240px]">
                <div className="font-extrabold text-[38px]">
                    {`${userState.name}님 Zeriong Keep과`}<br/>
                    함께 해주셔서 감사합니다.
                </div>
                <div className="text-[32px] font-bold mt-10">
                    메모기능은 현재 개발중에 있습니다.<br/>
                    빠른시일 내에 서비스하겠습니다!
                </div>
            </div>
        )
    )
}
