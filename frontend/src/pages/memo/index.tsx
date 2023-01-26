import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Link} from "react-router-dom";

export const MemoMain = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));
    return (
        loading ? (<div className="flex h-full items-center justify-center">로딩중...</div>) : (
            <div>
                <div className="font-extrabold text-[38px] pb-8">
                    {`${userState.name}님 Zeriong Keep과`}<br/>
                    함께 해주셔서 감사합니다.
                </div>
                <Link
                    to="profile/modify"
                >
                    <button className="font-bold text-2xl bg-orange-500 text-white rounded-xl px-8 py-4">
                        회원정보수정 테스트
                    </button>
                </Link>
            </div>
        )
    )
}
