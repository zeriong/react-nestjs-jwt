import React from "react";
import {BsFillGearFill} from "@react-icons/all-files/bs/BsFillGearFill";
import {AiFillBell} from "@react-icons/all-files/ai/AiFillBell";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {FaUserCircle} from "@react-icons/all-files/fa/FaUserCircle";
import {BiChevronDown} from "@react-icons/all-files/bi/BiChevronDown";

export const Header = () => {
    const { data: userState, loading } = useSelector((state: RootState) => (state.user));

    return (
        <>
            <header className="flex fixed h-[60px] w-full border-b-[1px] z-10 pl-[240px] bg-white">
                <div className="flex justify-between items-center px-5 w-full">
                    <div className="flex flex-row items-center">
                        <BsFillGearFill size="24" color="#9f9f9f" className="mr-1"/>
                        <div className="font-bold text-gray-700 text-[18px]">마이페이지</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <AiFillBell size="24" color="9f9f9f" className="mr-3"/>
                        <FaUserCircle size="30" color="9f9f9f" className="mr-2"/>
                        <div className="text-[#5f5f5f] flex cursor-pointer">
                            {`${userState.name}님`}
                            <BiChevronDown className="mt-1"/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}