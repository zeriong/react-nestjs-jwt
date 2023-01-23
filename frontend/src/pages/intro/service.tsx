import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const Service = () => {
    const { loading } = useSelector((state: RootState) => (state.user));
    return (
        loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
            <div className="m-auto text-center">
                <div className="text-[32px] font-bold mt-10">
                    메모기능은 현재 개발중에 있습니다.<br/>
                    빠른시일 내에 서비스하겠습니다!<br/><br/>
                    서비스 페이지입니다.
                </div>
            </div>
        )
    )
}