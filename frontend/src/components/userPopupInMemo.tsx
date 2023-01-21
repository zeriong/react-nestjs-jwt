import React from 'react';
import {GrUserSettings} from "@react-icons/all-files/gr/GrUserSettings";
import {BiLogOut} from "@react-icons/all-files/bi/BiLogOut";

export const UserPopup = () => {

    return (
        <>
            <div
                className="flex flex-col items-center p-5 absolute bg-orange-100 w-[130px] top-9 -left-20
                                    transition-all ease-in-out duration-300 hover:bg-orange-500 rounded-2xl invisible"
            >
                <div className="flex mb-1 justify-items-center h-7">
                    <GrUserSettings size="15" className="flex h-full"/>
                    <div className="flex items-center ml-1 h-full">회원정보</div>
                </div>
                <div className="flex justify-items-center h-7">
                    <BiLogOut size="18" className="flex h-full"/>
                    <div className="flex items-center ml-1 h-full">로그아웃</div>
                </div>
            </div>
        </>
    )
}