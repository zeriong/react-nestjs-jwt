import React from "react";
import {Link} from "react-router-dom";

export const Aside = () => {
    return (
        <nav className="fixed w-[240px] bg-gray-100 h-full z-20 border-r-2">
            <div className="flex flex-col h-full w-full py-[10px]">
                <Link to="/" className="flex justify-center font-extrabold text-[28px] mb-16">
                    Zeriong Keep!
                </Link>
                <div className="flex flex-col justify-center text-center px-5 text-[20px] font-extrabold text-[#4f4f4f]">
                    <Link to="/dashboard" className="py-3 border-y-[1px] border-gray-300 w-full">
                        홈
                    </Link>
                    <Link to="/dashboard/profile" className="py-3 border-b-[1px] border-gray-300 w-full">
                        나의 회원정보
                    </Link>
                </div>
            </div>
        </nav>
    )
}