import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const MemoMain = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));
    return (
        loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
            <>
                <div className="font-extrabold text-[38px]">
                    {`${userState.name}님 Zeriong Keep과`}<br/>
                    함께 해주셔서 감사합니다.
                </div>
                <div className="text-[32px] font-bold mt-10">
                    메모기능은 현재 개발중에 있습니다.<br/>
                    빠른시일 내에 서비스하겠습니다!
                </div>
            </>
        )
    )
}
